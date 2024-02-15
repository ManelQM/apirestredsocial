const Publication = require("../models/publication");

const test1 = (req, res) => {
  return res.status(200).json({
    message: "esto va o que",
    nombre: "publications",
  });
};

// CREATE PUBLICATION CONTROLLER

const createPublication = async (req, res) => {
  try {
    const params = req.body; // Recogemos datos body

    if (!params) {
      // Si no llegan, error
      return res.status(400).json({
        status: "error",
        message: "Please complete the required fields",
      });
    }

    let newPublication = new Publication(params); // Crear el objeto y darle contenido
    newPublication.user = req.authorization.id;

    const publicationStored = await newPublication.save(); // Guardar objeto en BD
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

//GET A PUBLICATION CONTROLLER

const getPublication = async (req, res) => {
  try {
    const publicationId = req.params.id;

    const findPublication = await Publication.findById(publicationId);

    if (!publicationId || !findPublication) {
      return res.status(400).json({
        status: "error",
        message: "Cant find the publication",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Here is what you want!",
      findPublication,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const deletePublication = async (req,res) => {
  try {
    const publicationId = req.params.id; 

    const deleteThis = await Publication.find({"user": req.authorization.id, "_id": publicationId})
    .remove(); 

    if (!deleteThis) {
      return res.status(400).json({
        status: "error",
        message: "Cant remove the publication"
      });
    };

    return res.status(200).json({
      status: "success",
      message: "Publication removed!",
      publicationDeleted: publicationId
    });

  } catch(error) {
    console.error(error)
    return res.status(400).json({
      status:"error",
      message: "Internal Server Error",
    });
  };
};

module.exports = {
  test1,
  createPublication,
  getPublication,
  deletePublication,
};
