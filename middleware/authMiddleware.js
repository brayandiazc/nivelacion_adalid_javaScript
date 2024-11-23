const jwt = require("jsonwebtoken");

exports.protegerRuta = (req, res, next) => {
  // Buscar el token en el encabezado o en el cuerpo de la solicitud
  const token = req.headers["authorization"]?.split(" ")[1] || req.body.token;

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
