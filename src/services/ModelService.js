const fs = require('fs');
const path = require('path');
const { sequelize, connectDB } = require('../database/db');
const Guardian = require('./Guardian');
const logger = require('../utils/logger');

class ModelService {
    constructor() {
        this.models = new Map();
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) {
            return Guardian.handleGeneric('ModelService wurde bereits initialisiert.', 'ModelService Init');
        }

        try {
            await connectDB();

            await this._loadModels();

            await sequelize.sync({ force: false });

            this.initialized = true;
        } catch (error) {
            Guardian.handleGeneric('Fehler bei der Initialisierung des ModelService.', 'ModelService Init', error.stack);
            throw error;
        }
    }

    async _loadModels() {
        const modelsPath = path.join(__dirname, '..', 'models');

        if (!fs.existsSync(modelsPath)) {
            return Guardian.handleGeneric(`Das Models-Verzeichnis (${modelsPath}) existiert nicht.`, 'ModelService Load');
        }

        const modelFiles = fs.readdirSync(modelsPath).filter(file =>
            file.endsWith('.js') && file !== 'index.js'
        );

        for (const file of modelFiles) {
            try {
                const filePath = path.join(modelsPath, file);
                const modelDefinition = require(filePath);

                if (typeof modelDefinition === 'function') {
                    const model = modelDefinition(sequelize);
                    const modelName = model.name || path.basename(file, '.js');
                    this.models.set(modelName, model);
                }
                else if (modelDefinition && modelDefinition.tableName) {
                    const modelName = modelDefinition.name || path.basename(file, '.js');
                    this.models.set(modelName, modelDefinition);
                } else {
                    Guardian.handleGeneric(
                        `Model in Datei ${file} hat kein gültiges Format. Es sollte entweder eine Factory-Funktion oder ein Sequelize Model sein.`,
                        'ModelService Load'
                    );
                }
            } catch (error) {
                Guardian.handleGeneric(`Fehler beim Laden des Models in Datei ${file}.`, 'ModelService Load', error.stack);
            }
        }

        this._setupAssociations();
    }

    _setupAssociations() {
        for (const [modelName, model] of this.models) {
            if (typeof model.associate === 'function') {
                try {
                    model.associate(this.models);
                } catch (error) {
                    Guardian.handleGeneric(
                        `Fehler beim Einrichten der Assoziationen für Model ${modelName}.`,
                        'ModelService Associations',
                        error.stack
                    );
                }
            }
        }
    }

    getModel(modelName) {
        if (!this.initialized) {
            Guardian.handleGeneric('ModelService wurde nicht initialisiert. Rufe initialize() auf.', 'ModelService Get');
            return null;
        }

        const model = this.models.get(modelName);
        if (!model) {
            Guardian.handleGeneric(`Model mit dem Namen '${modelName}' wurde nicht gefunden.`, 'ModelService Get');
            return null;
        }

        return model;
    }

    getAllModels() {
        if (!this.initialized) {
            Guardian.handleGeneric('ModelService wurde nicht initialisiert. Rufe initialize() auf.', 'ModelService GetAll');
            return new Map();
        }

        return this.models;
    }

    getModelCount() {
        if (!this.initialized) {
            return 0;
        }
        return this.models.size;
    }

    isInitialized() {
        return this.initialized;
    }
}

module.exports = new ModelService();