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
        allowNull: false
    },
    shd: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    atk: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eff: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    kt: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    db: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
  tableName: 'usernode',
  timestamps: true
});

module.exports = UserNode;