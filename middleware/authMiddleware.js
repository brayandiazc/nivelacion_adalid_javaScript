// Middleware para verificar el token JWT
const jwt = require("jsonwebtoken");

// Middleware para verificar el token JWT
exports.protegerRuta = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Leer el token del header Authorization

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado; // Agregar la información del usuario al request
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};
