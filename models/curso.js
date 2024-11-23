// Conexión a la base de datos
const db = require("./db");

// Crear tabla Curso si no existe
const createTableCurso = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Curso (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(100) NOT NULL,
      descripcion TEXT NOT NULL,
      duracion INT NOT NULL,
      instructor_id INT NOT NULL REFERENCES Usuario(id),
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.query(query);
    console.log("Tabla Curso creada correctamente");
  } catch (error) {
    console.error("Error al crear la tabla Curso:", error.message);
  }
};

// Ejecutar la creación de la tabla
createTableCurso();
