// IMPORTAR DEPENDENCIAS 
const jwt = require("jwt-simple");
const moment = require("moment"); // libreria para manejar fechas

// CLAVE SECRETA

const secret = "El_que_come_fuego_expulsa_chispas_757"; 

// CREAR UNA FUNCION PARA GENERAR TOKENS
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role, 
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix(), 
    };
    // DEVOLVER JWT CODIFICADO
    return jwt.encode(payload, secret); 
}


module.exports = {
    secret,
    createToken,
}