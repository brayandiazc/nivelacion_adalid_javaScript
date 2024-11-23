// Importar la librería 'pg' y dotenv para manejar variables de entorno
const { Pool } = require("pg");
require("dotenv").config();

// Crear una nueva instancia de Pool para manejar la conexión a la base de datos
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Probar la conexión al inicializar
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err.message);
  } else {
    console.log("✅ Conexión exitosa a la base de datos PostgreSQL");
  }
  // Liberar el cliente si se ha establecido correctamente
  if (release) release();
});

// Exportar el pool para que pueda ser reutilizado en otros módulos
module.exports = pool;
