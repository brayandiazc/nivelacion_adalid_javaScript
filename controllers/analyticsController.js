// Importar modelo de base de datos
const db = require("../models/db");

// Obtener cantidad de estudiantes inscritos por curso
exports.obtenerEstadisticasInscripcion = async (req, res) => {
  try {
    const query = `
      SELECT Curso.id, Curso.titulo, COUNT(Inscripcion.id) AS cantidad_inscritos
      FROM Curso
      LEFT JOIN Inscripcion ON Curso.id = Inscripcion.curso_id
      GROUP BY Curso.id
      ORDER BY cantidad_inscritos DESC;
    `;
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(
      "Error al obtener estadísticas de inscripción:",
      error.message
    );
    res.status(500).json({
      error: "No se pudieron obtener las estadísticas de inscripción",
    });
  }
};

// Obtener progreso promedio de los estudiantes en un curso
exports.obtenerProgresoPromedio = async (req, res) => {
  const cursoId = req.params.id;

  try {
    const query = `
      SELECT AVG(Inscripcion.progreso) AS progreso_promedio
      FROM Inscripcion
      WHERE curso_id = $1;
    `;
    const result = await db.query(query, [cursoId]);

    if (!result.rows[0].progreso_promedio) {
      return res
        .status(404)
        .json({ error: "No hay estudiantes inscritos en este curso" });
    }

    res
      .status(200)
      .json({ cursoId, progreso_promedio: result.rows[0].progreso_promedio });
  } catch (error) {
    console.error("Error al obtener progreso promedio:", error.message);
    res.status(500).json({ error: "No se pudo obtener el progreso promedio" });
  }
};

// Obtener cursos más populares
exports.obtenerCursosPopulares = async (req, res) => {
  try {
    const query = `
      SELECT Curso.id, Curso.titulo, COUNT(Inscripcion.id) AS cantidad_inscritos
      FROM Curso
      LEFT JOIN Inscripcion ON Curso.id = Inscripcion.curso_id
      GROUP BY Curso.id
      ORDER BY cantidad_inscritos DESC
      LIMIT 5;
    `;
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener cursos populares:", error.message);
    res
      .status(500)
      .json({ error: "No se pudieron obtener los cursos populares" });
  }
};
