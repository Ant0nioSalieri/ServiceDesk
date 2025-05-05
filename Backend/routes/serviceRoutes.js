const express = require('express');
const router = express.Router();
const Servicio = require('../models/Servicio'); // Importar el modelo de servicios

// Endpoint para obtener servicios desde la base de datos
router.get('/', async (req, res) => {
    try {
        
        const servicios = await Servicio.findAll(); // Consulta a la base de datos

        if (!servicios || servicios.length === 0) {
            // Si no hay servicios, devolver un mensaje claro
            return res.status(404).json({ msg: 'No hay servicios disponibles.' });
        }

        res.json(servicios); // Enviar los servicios como respuesta
    } catch (error) {
        console.error('Error al obtener los servicios:', error);
        res.status(500).json({ msg: 'Error al obtener los servicios' });
    }
});


// Endpoint para obtener servicios por categoría
router.get('/category/:id', async (req, res) => {
    try {
        const servicios = await Servicio.findAll({
            where: { id_categoria: req.params.id },
            attributes: ['id_servicio', 'nom_servicio', 'desc_servicio'],
        });

        res.json(servicios);
    } catch (error) {
        console.error('Error al obtener los servicios:', error);
        res.status(500).json({ msg: 'Error al obtener los servicios' });
    }
});
module.exports = router;