// Importar librerias
const express = require("express");

// Importar controladores
const {
  crearCurso,
  editarCurso,
  eliminarCurso,
  inscribirseEnCurso,
} = require("../controllers/courseController");

const { protegerRuta } = require("../middleware/authMiddleware");

const router = express.Router();

// Rutas para la gestión de cursos
router.post("/curso/crear", protegerRuta, crearCurso);
router.put("/curso/:id", protegerRuta, editarCurso);
router.delete("/curso/:id", protegerRuta, eliminarCurso);
router.post("/curso/:id/inscribirse", protegerRuta, inscribirseEnCurso);

module.exports = router;
const {
  renderCrearCurso,
  renderEditarCurso,
} = require("../controllers/courseController");

// Rutas para crear y editar cursos
router.get("/curso/crear", renderCrearCurso);
router.get("/curso/:id/editar", renderEditarCurso);
