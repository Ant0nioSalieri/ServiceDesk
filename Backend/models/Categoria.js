const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
    id_categoria: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_categoria: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    id_padre: {
        type: DataTypes.BIGINT,
        allowNull: true, // NULL si es una categoría principal
        references: {
            model: 'categorias',
            key: 'id_categoria',
        },
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'categorias',
    timestamps: false,
});

module.exports = Categoria;