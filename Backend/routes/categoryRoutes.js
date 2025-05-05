const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');
const Servicio = require('../models/Servicio');

// Endpoint para obtener categorías y subcategorías
router.get('/', async (req, res) => {
    try {
        const categorias = await Categoria.findAll({
            where: { id_padre: null }, // Categorías principales
            include: [
                {
                    model: Categoria,
                    as: 'subcategorias', // Alias definido en la relación
                    include: [
                        {
                            model: Servicio,
                            as: 'servicios', // Alias definido en la relación
                            attributes: ['id_servicio', 'nom_servicio', 'desc_servicio'],
                        },
                    ],
                },
                {
                    model: Servicio,
                    as: 'servicios', // Alias definido en la relación
                    attributes: ['id_servicio', 'nom_servicio', 'desc_servicio'],
                },
            ],
        });

        res.json(categorias);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ msg: 'Error al obtener las categorías', error: error.message });
    }
});

module.exports = router;