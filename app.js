// app.js

// Importar dependencias
const express = require("express");
const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();

// Inicializar la aplicación
const app = express();

// Middleware para parsear JSON y datos del formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de ejemplo
app.get("/", (req, res) => {
  res.send("Bienvenido a TechWorld Learning Platform");
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
