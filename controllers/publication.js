const publication = require("../models/publication");
const Publication = require("../models/publication");

const test1 = (req, res) => {
  return res.status(200).json({
    message: "esto va o que",
    nombre: "publications",
  });
};

const createPublication = async (req, res) => {
  try {
    
    const params = req.body;  // Recogemos datos body
    
    if (!params) {  // Si no llegan, error
      return res.status(400).json({
        status: "error",
        message: "Please complete the required fields",
      });
    }
    
    let newPublication = new Publication(params);      // Crear el objeto y darle contenido
    newPublication.user = req.authorization.id
    
    const publicationStored = await newPublication.save();  // Guardar objeto en BD
    if (!publicationStored) {
      return res.status(400).json({
        status: "error",
        message: "Cant save the publication",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Publication created!",
      publicationStored,  
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  test1,
  createPublication,
};
