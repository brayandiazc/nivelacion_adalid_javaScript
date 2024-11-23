// Importar librerías
const express = require("express");

// Importar controladores
const {
  obtenerPerfil,
  actualizarPerfil,
  renderDashboard,
} = require("../controllers/userController");

const { protegerRuta } = require("../middleware/authMiddleware");

const router = express.Router();

// Ruta para obtener el perfil del usuario
router.get("/usuario/perfil", protegerRuta, obtenerPerfil);

// Ruta para actualizar el perfil del usuario
router.put("/usuario/perfil", protegerRuta, actualizarPerfil);

// Ruta para renderizar el panel del usuario
router.get("/dashboard", protegerRuta, renderDashboard);

module.exports = router;
