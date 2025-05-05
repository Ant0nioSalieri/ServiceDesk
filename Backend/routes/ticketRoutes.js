const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Endpoint para crear un ticket
router.post('/create', async (req, res) => {
    try {
        const { usuario_id, servicio_id, descripcion } = req.body;

        // Crear el ticket
        const nuevoTicket = await Ticket.create({
            tipo_ticket: 'solicitud', // Por defecto, puedes cambiarlo según el tipo
            titulo_ticket: `Ticket para servicio ${servicio_id}`,
            desc_ticket: descripcion,
            fe_ini_ticket: new Date(),
            estado_ticket: 'abierto',
            id_usuario: usuario_id,
            id_sla: servicio_id === 1 ? 1 : 2, // Ejemplo: SLA según el servicio
            fe_lim_ticket: new Date(Date.now() + (servicio_id === 1 ? 8 : 24) * 60 * 60 * 1000), // SLA en horas
            cump_sla: false,
        });

        res.status(201).json({ success: true, ticket: nuevoTicket });
    } catch (error) {
        console.error('Error al crear el ticket:', error);
        res.status(500).json({ success: false, msg: 'Error al crear el ticket' });
    }
});

//Endpoint para obtener tickets de un usuario
router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Obtener tickets del usuario
        const tickets = await Ticket.findAll({ where: { id_usuario: id } });

        res.json(tickets);
    } catch (error) {
        console.error('Error al obtener los tickets del usuario:', error);
        res.status(500).json({ success: false, msg: 'Error al obtener los tickets' });
    }
});

//Endpoint para obtener tickets pendientes
router.get('/pending', async (req, res) => {
    try {
        const tickets = await Ticket.findAll({ where: { id_agente: null } });

        res.json(tickets);
    } catch (error) {
        console.error('Error al obtener los tickets pendientes:', error);
        res.status(500).json({ success: false, msg: 'Error al obtener los tickets pendientes' });
    }
});

//Endpoint para asignar un ticket a un agente
router.post('/assign/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { agente_id } = req.body;

        // Asignar el ticket al agente
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ success: false, msg: 'Ticket no encontrado' });
        }

        ticket.id_agente = agente_id;
        ticket.estado_ticket = 'en proceso';
        await ticket.save();

        res.json({ success: true, ticket });
    } catch (error) {
        console.error('Error al asignar el ticket:', error);
        res.status(500).json({ success: false, msg: 'Error al asignar el ticket' });
    }
});

//Endpoint para obtener los tickets asignados a un agente
router.get('/agent/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Obtener los tickets asignados al agente
        const tickets = await Ticket.findAll({
            where: { id_agente: id },
        });

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ msg: 'No tienes tickets asignados.' });
        }

        res.json(tickets);
    } catch (error) {
        console.error('Error al obtener los tickets asignados:', error);
        res.status(500).json({ msg: 'Error al obtener los tickets asignados.' });
    }
});



module.exports = router;