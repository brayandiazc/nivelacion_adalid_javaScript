// Importar el modelo de la base de datos
const db = require("../models/db");

// Controlador para renderizar la vista de crear curso
exports.renderCrearCurso = (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extraer token del encabezado
  res.render("crear-curso", { title: "Crear Nuevo Curso", token });
};

// Controlador para renderizar la vista de editar curso
exports.renderEditarCurso = async (req, res) => {
  const cursoId = req.params.id;

  try {
    const query = `SELECT * FROM Curso WHERE id = $1`;
    const result = await db.query(query, [cursoId]);

    if (result.rows.length === 0) {
      return res.status(404).send("Curso no encontrado");
    }

    res.render("editar-curso", {
      title: "Editar Curso",
      curso: result.rows[0],
    });
  } catch (error) {
    console.error("Error al obtener el curso:", error.message);
    res.status(500).send("Error al cargar el curso");
  }
};

// Controlador para crear un curso
exports.crearCurso = async (req, res) => {
  const { titulo, descripcion, duracion } = req.body;
  const instructorId = req.usuario.id; // ID del instructor autenticado

  try {
    const query = `
      INSERT INTO Curso (titulo, descripcion, duracion, instructor_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, titulo, descripcion, duracion, instructor_id, fecha_creacion;
    `;
    const values = [titulo, descripcion, duracion, instructorId];
    const result = await db.query(query, values);

    res
      .status(201)
      .json({ mensaje: "Curso creado con éxito", curso: result.rows[0] });
  } catch (error) {
    console.error("Error al crear el curso:", error.message);
    res.status(500).json({ error: "No se pudo crear el curso" });
  }
};

// Controlador para editar un curso
exports.editarCurso = async (req, res) => {
  const { titulo, descripcion, duracion } = req.body;
  const cursoId = req.params.id;
  const instructorId = req.usuario.id; // ID del instructor autenticado

  try {
    const query = `
      UPDATE Curso
      SET titulo = $1, descripcion = $2, duracion = $3
      WHERE id = $4 AND instructor_id = $5
      RETURNING id, titulo, descripcion, duracion, instructor_id, fecha_creacion;
    `;
    const values = [titulo, descripcion, duracion, cursoId, instructorId];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Curso no encontrado o no autorizado" });
    }

    res
      .status(200)
      .json({ mensaje: "Curso actualizado con éxito", curso: result.rows[0] });
  } catch (error) {
    console.error("Error al editar el curso:", error.message);
    res.status(500).json({ error: "No se pudo actualizar el curso" });
  }
};

// Controlador para eliminar un curso
exports.eliminarCurso = async (req, res) => {
  const cursoId = req.params.id;
  const instructorId = req.usuario.id; // ID del instructor autenticado

  try {
    const query = `
      DELETE FROM Curso
      WHERE id = $1 AND instructor_id = $2
      RETURNING id;
    `;
    const result = await db.query(query, [cursoId, instructorId]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Curso no encontrado o no autorizado" });
    }

    res.status(200).json({ mensaje: "Curso eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el curso:", error.message);
    res.status(500).json({ error: "No se pudo eliminar el curso" });
  }
};

// Controlador para inscribirse en un curso
exports.inscribirseEnCurso = async (req, res) => {
  const cursoId = req.params.id;
  const estudianteId = req.usuario.id; // ID del estudiante autenticado

  try {
    const query = `
      INSERT INTO Inscripcion (estudiante_id, curso_id)
      VALUES ($1, $2)
      RETURNING id, estudiante_id, curso_id, fecha_creacion;
    `;
    const result = await db.query(query, [estudianteId, cursoId]);

    res.status(201).json({
      mensaje: "Inscripción realizada con éxito",
      inscripcion: result.rows[0],
    });
  } catch (error) {
    console.error("Error al inscribirse en el curso:", error.message);
    res.status(500).json({ error: "No se pudo inscribir en el curso" });
  }
};
