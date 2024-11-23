// Importar librerías
const express = require("express");

// Importar controladores
const {
  obtenerEstadisticasInscripcion,
  obtenerProgresoPromedio,
  obtenerCursosPopulares,
} = require("../controllers/analyticsController");

const { protegerRuta } = require("../middleware/authMiddleware");

const router = express.Router();

// Ruta para obtener estadísticas de inscripción por curso
router.get(
  "/estadisticas/inscripcion",
  protegerRuta,
  obtenerEstadisticasInscripcion
);

// Ruta para obtener progreso promedio de estudiantes en un curso
router.get("/estadisticas/progreso/:id", protegerRuta, obtenerProgresoPromedio);

// Ruta para obtener los cursos más populares
router.get("/estadisticas/populares", protegerRuta, obtenerCursosPopulares);

module.exports = router;
