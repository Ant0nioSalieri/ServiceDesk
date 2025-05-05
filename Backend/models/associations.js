const Categoria = require('./Categoria');
const Servicio = require('./Servicio');

// Relación jerárquica en Categorias
Categoria.hasMany(Categoria, { as: 'subcategorias', foreignKey: 'id_padre' });
Categoria.belongsTo(Categoria, { as: 'padre', foreignKey: 'id_padre' });

// Relación entre Categorias y Servicios
Categoria.hasMany(Servicio, { as: 'servicios', foreignKey: 'id_categoria' });
Servicio.belongsTo(Categoria, { foreignKey: 'id_categoria', as: 'categoria' });