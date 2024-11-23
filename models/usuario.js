// models/usuario.js

const db = require("./db"); // Conexión a la base de datos

// Crear tabla Usuario si no existe
const createTableUsuario = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Usuario (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      correo VARCHAR(100) UNIQUE NOT NULL,
      contrasena VARCHAR(255) NOT NULL,
      rol VARCHAR(50) NOT NULL,
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.query(query);
    console.log("Tabla Usuario creada correctamente");
  } catch (error) {
    console.error("Error al crear la tabla Usuario:", error.message);
  }
};

// Ejecutar la creación de la tabla
createTableUsuario();
