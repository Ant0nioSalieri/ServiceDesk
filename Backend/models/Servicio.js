const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

const Servicio = sequelize.define('Servicio', {
    id_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_servicio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc_servicio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'servicios', // Nombre de la tabla en la base de datos
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
});

module.exports = Servicio;