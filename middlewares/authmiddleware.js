// IMPORTAR MODULOS
const jwt = require("jwt-simple");
const moment = require("moment");

// IMPORTAR CLAVE SECRETA
const libjwt = require("../services/auth");
const secret = libjwt.secret;

// FUNCION DE AUTH

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    // COMPROBAR SI ME LLEGA LA CABECERA DE AUTH
    return res.status(403).json({
      status: "error",
      message: "Missing headers authorization",
    });
  }

  
  let token = req.headers.authorization.replace(/^(Bearer\s*)|(['"])+/g, "");

  console.log(token,"TOKEN")
  try {
    // DECODIFICAR EL TOKEN

    let payload = jwt.decode(token, secret);

    if (payload.exp <= moment().unix()) {
      //COMPROBAR EXPIRACION DEL TOKEN
      return res.status(401).json({
        status: "error",
        message: "Expired token",
      });
    }
      // AGREGAR DATOS DE USUARIO A REQUEST
        req.user = payload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(404).json({
      status: "error",
      message: "Invalid token",
    });
  }
  // PASAR A EJECUCION DE ACCION
  next();
};


module.exports = {
    auth
}