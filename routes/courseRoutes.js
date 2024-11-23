// Importar librerías
const express = require("express");

// Importar controladores
const {
  crearCurso,
  editarCurso,
  eliminarCurso,
  inscribirseEnCurso,
  renderCrearCurso,
  renderEditarCurso,
} = require("../controllers/courseController");

const { protegerRuta } = require("../middleware/authMiddleware");

const router = express.Router();

// Rutas para renderizar vistas de cursos
router.get("/curso/crear", renderCrearCurso);
router.get("/curso/:id/editar", renderEditarCurso);

// Rutas para la gestión de cursos
router.post("/curso/crear", protegerRuta, crearCurso);
router.put("/curso/:id", protegerRuta, editarCurso);
router.delete("/curso/:id", protegerRuta, eliminarCurso);
router.post("/curso/:id/inscribirse", protegerRuta, inscribirseEnCurso);

module.exports = router;
