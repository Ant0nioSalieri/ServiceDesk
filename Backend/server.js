require('dotenv').config(); // Cargar las variables de entorno desde .env
const express = require('express');
const sequelize = require('./config');
const Usuario = require('./models/Usuario');
const Sla = require('./models/Sla');
const Articulo = require('./models/Articulo');
const Activo = require('./models/Activo');
const Cambio = require('./models/Cambio');
const Ticket = require('./models/Ticket');

const app = express();

// Configurar middlewares y rutas (si es necesario)
app.use(express.json());

// Sincronizar los modelos con la base de datos
sequelize.sync({ force: false }) // force: false evita eliminar tablas existentes
    .then(() => {
        console.log("Tablas sincronizadas correctamente");
    })
    .catch((err) => {
        console.error("Error sincronizando las tablas:", err);
    });

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
