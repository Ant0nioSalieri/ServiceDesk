// controllers/authController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login de usuario
exports.login = async (req, res) => {
    try {
      const { email_usuario, pass_usuario } = req.body;
  
      const user = await Usuario.findOne({ where: { email_usuario } });
      if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });
  
      const isMatch = await bcrypt.compare(pass_usuario, user.pass_usuario);
      if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });
  
      const token = jwt.sign(
        { id_usuario: user.id_usuario, tipo_usuario: user.tipo_usuario },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ msg: 'Login exitoso', token, usuario: { id: user.id_usuario, tipo: user.tipo_usuario } });
    } catch (error) {
      console.error("Error en login:", error); // Agregar detalles del error
      res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
  };
  
  // Registro de usuario
  exports.register = async (req, res) => {
    try {
      const { nom_usuario, ape_usuario, email_usuario, pass_usuario, tipo_usuario } = req.body;
  
      // Validar que no exista otro usuario con el mismo correo
      const existingUser = await Usuario.findOne({ where: { email_usuario } });
      if (existingUser) {
        return res.status(400).json({ msg: 'El correo ya está registrado' });
      }
  
      // Hashear la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(pass_usuario, salt);
  
      // Crear el nuevo usuario
      const nuevoUsuario = await Usuario.create({
        nom_usuario,
        ape_usuario,
        email_usuario,
        pass_usuario: hashedPassword,
        tipo_usuario
      });
  
      res.status(201).json({ msg: 'Usuario registrado con éxito', usuario: { id: nuevoUsuario.id_usuario, email: nuevoUsuario.email_usuario } });
    } catch (error) {
      console.error("Error en registro:", error); // Agregar detalles del error
      res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
  };