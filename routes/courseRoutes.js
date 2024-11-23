// routes/courseRoutes.js

const express = require("express");
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
