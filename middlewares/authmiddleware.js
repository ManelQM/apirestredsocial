// IMPORTAR MODULOS 
const jwt = require("jwt-simple"); 
const moment = require("moment"); 

// IMPORTAR CLAVE SECRETA 
const libjwt = require ("../services/auth"); 
const secret = libjwt.secret; 


// FUNCION DE AUTH

exports.auth = (req,res,next) => {
    if(!req.headers.authorization) {
        return res.status(403).json({
            status: "error",
            message: "Missing headers authorization",
        })
    }

    let token = req.headers.authorization.replace(/['"]+/g,'' );

    try {

        let payload = jwt.decode(token,secret); 
        if(payload.exp <= moment().unix()) {
            return res.status(401).json({
                status: "errro",
                message: "Expired token"
            })
        }

    }catch(error){
        return res.status(404).json({
            status: "error",
            message: "Invalid token",
            error
        })

    }
    req.user = payload; 
    next(); 
}

// COMPROBAR SI ME LLEGA LA CABECERA DE AUTH

// DECODIFICAR EL TOKEN 

// AGREGAR DATOS DE USUARIO A REQUEST 

// PASAR A EJECUCION DE ACCION 