// controllers/userController.js

const db = require("../models/db");

// Controlador para obtener el perfil del usuario autenticado
exports.obtenerPerfil = async (req, res) => {
  try {
    const usuarioId = req.usuario.id; // ID del usuario autenticado extraído del token

    const query = `SELECT id, nombre, correo, rol, fecha_creacion FROM Usuario WHERE id = $1`;
    const result = await db.query(query, [usuarioId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error.message);
    res.status(500).json({ error: "No se pudo obtener el perfil del usuario" });
  }
};

// Controlador para actualizar el perfil del usuario autenticado
exports.actualizarPerfil = async (req, res) => {
  try {
    const usuarioId = req.usuario.id; // ID del usuario autenticado extraído del token
    const { nombre, correo } = req.body;

    const query = `
      UPDATE Usuario
      SET nombre = $1, correo = $2
      WHERE id = $3
      RETURNING id, nombre, correo, rol, fecha_creacion;
    `;
    const values = [nombre, correo, usuarioId];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({
      mensaje: "Perfil actualizado con éxito",
      usuario: result.rows[0],
    });
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario:", error.message);
    res
      .status(500)
      .json({ error: "No se pudo actualizar el perfil del usuario" });
  }
};
