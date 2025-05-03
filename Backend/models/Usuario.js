const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importamos la configuración de la base de datos

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    ape_usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email_usuario: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
    },
    pass_usuario: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    tipo_usuario: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isIn: [['usuario', 'agente']],
        },
    },
}, {
    tableName: 'usuarios',
    timestamps: false, // Si no usas columnas createdAt / updatedAt
});

module.exports = Usuario;
