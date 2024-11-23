// Importar librerías
const express = require("express");

// Importar controladores
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
