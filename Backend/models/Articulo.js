const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario'); // Para el FK de id_tecnico_creador

const Articulo = sequelize.define('Articulo', {
    id_articulo: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo_articulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    conten_articulo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cate_articulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    subcate_articulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    fecha_articulo: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'articulos',
    timestamps: false,
});

Articulo.belongsTo(Usuario, { foreignKey: 'id_tecnico_creador', targetKey: 'id_usuario' });

module.exports = Articulo;
