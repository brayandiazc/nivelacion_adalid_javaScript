// Manejar las rutas de autenticación
const express = require("express");
const {
  registrarUsuario,
  iniciarSesion,
} = require("../controllers/authController");

const router = express.Router();

// Ruta para registrar usuarios
router.post("/usuario/crear", registrarUsuario);

// Ruta para iniciar sesión
router.post("/usuario/inicio-sesion", iniciarSesion);

module.exports = router;
