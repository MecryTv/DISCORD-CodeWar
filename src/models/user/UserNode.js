const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');

const UserNode = sequelize.define('UserNode', {
    discordId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    shd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100
    },
    atk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50
    },
    eff: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100
    },
    kt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50
    },
    db: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
  tableName: 'usernode',
  timestamps: true
});

module.exports = UserNode;