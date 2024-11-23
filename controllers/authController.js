// Importar librearías y modelos
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en el archivo .env");
}

// Renderizar la vista de inicio de sesión
exports.renderLogin = (req, res) => {
  res.render("login", { title: "Iniciar Sesión" });
};

// Renderizar la vista de registro
exports.renderRegister = (req, res) => {
  res.render("register", { title: "Registro de Usuario" });
};

// Controlador para registrar usuarios
exports.registrarUsuario = async (req, res) => {
  const { nombre, correo, contrasena, rol } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const query = `
      INSERT INTO Usuario (nombre, correo, contrasena, rol)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, correo, rol, fecha_creacion;
    `;
    const values = [nombre, correo, hashedPassword, rol];
    const result = await db.query(query, values);

    res.status(201).json({
      mensaje: "Usuario registrado con éxito",
      usuario: result.rows[0],
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    res.status(500).json({ error: "No se pudo registrar el usuario" });
  }
};

// Controlador para iniciar sesión
exports.iniciarSesion = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const query = `SELECT * FROM Usuario WHERE correo = $1`;
    const result = await db.query(query, [correo]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuario = result.rows[0];
    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!esValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ mensaje: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res.status(500).json({ error: "No se pudo iniciar sesión" });
  }
};
