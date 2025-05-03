const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registro de usuario
router.post('/register', authController.register);

// Ruta para login de usuario
router.post('/login', authController.login);

// Ruta para validar el token de usuario
router.get('/validate', authController.validateToken);
module.exports = router;