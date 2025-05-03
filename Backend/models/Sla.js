const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sla = sequelize.define('Sla', {
    id_sla: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_sla: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    tiempo_sla: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'sla',
    timestamps: false,
});

module.exports = Sla;
