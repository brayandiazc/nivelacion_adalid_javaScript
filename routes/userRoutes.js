// Endpoints para la gestión de usuarios
const express = require("express");
const {
  obtenerPerfil,
  actualizarPerfil,
} = require("../controllers/userController");
const { protegerRuta } = require("../middleware/authMiddleware");

const router = express.Router();

// Ruta para obtener el perfil del usuario
router.get("/usuario/perfil", protegerRuta, obtenerPerfil);

// Ruta para actualizar el perfil del usuario
router.put("/usuario/perfil", protegerRuta, actualizarPerfil);

module.exports = router;
