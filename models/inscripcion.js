// models/inscripcion.js

const db = require("./db"); // Conexión a la base de datos

// Crear tabla Inscripcion si no existe
const createTableInscripcion = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Inscripcion (
      id SERIAL PRIMARY KEY,
      estudiante_id INT NOT NULL REFERENCES Usuario(id),
      curso_id INT NOT NULL REFERENCES Curso(id),
      progreso INT DEFAULT 0,
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.query(query);
    console.log("Tabla Inscripcion creada correctamente");
  } catch (error) {
    console.error("Error al crear la tabla Inscripcion:", error.message);
  }
};

// Ejecutar la creación de la tabla
createTableInscripcion();
