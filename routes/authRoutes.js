// Importar librerías
const express = require("express");

// Importar controladores
const {
  registrarUsuario,
  iniciarSesion,
  renderLogin,
  renderRegister,
  renderLandingPage,
} = require("../controllers/authController");

const router = express.Router();

// Ruta para la página de inicio
router.get("/", renderLandingPage);

// Rutas para renderizar vistas de autenticación
router.get("/login", renderLogin);
router.get("/register", renderRegister);

// Ruta para registrar usuarios
router.post("/usuario/crear", registrarUsuario);

// Ruta para iniciar sesión
router.post("/usuario/inicio-sesion", iniciarSesion);

module.exports = router;
