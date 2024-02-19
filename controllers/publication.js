const Publication = require("../models/publication");
const fs = require("fs");
const path = require("path");
const followService = require("../services/followService");

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

// DELETE PUBLICATION CONTROLLER

const deletePublication = async (req, res) => {
  try {
    // Recoger datos
    const publicationId = req.params.id;
    // Buscar por Id
    const publication = await Publication.findById(publicationId);

    // Verificar si la publicación existe
    if (!publication) {
      return res.status(400).json({
        status: "error",
        message: "Publication not found",
      });
    }
    // Verificar si el usuario que quiere borrar la publicación es el mismo que la ha creado
    if (publication.user.toString() !== req.authorization.id) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to delete this publication",
      });
    }
    // Buscar publicación por Id y borrar
    const deletePublication = await Publication.findByIdAndDelete(
      publicationId
    );

    if (!deletePublication) {
      return res.status(400).json({
        status: "error",
        message: "Unable to remove the publication",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Publication removed!",
      publicationDeleted: publicationId,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const getAllUserPublication = async (req, res) => {
  try {
    const userId = req.params.id;

    let page = 1;

    if (req.params.page) page = req.params.page;

    const itemsPerPage = 10;

    const publications = await Publication.find({ user: userId })
      .sort({ created_at: -1 }) // Ordenar por created_at en orden descendente
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .populate("user", "-password -__v -role"); // TO DO => Populate no funciona bien
    console.log("Publications =>", publications);

    if (!publications) {
      return res.status(400).json({
        status: "error",
        message: "Cant find publications",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Publications list =>",
      page,
      publications,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// UPLOAD IMAGE PUBLICATION CONTROLLER

const uploadImgPblctn = async (req, res) => {
  try {
    // Recoger fichero de imagen y comprobar que existe
    const publicationId = req.params.id; // Id de la publicación
    if (!req.file) {
      return res.status(404).json({
        status: "error",
        message: "Please add an Image",
      });
    }
    // Conseguir nombre del archivo
    let image = req.file.originalname; //originalname nombre que le da Multer a la imagen en sí

    // Sacar la extension del archivo
    const imageSplit = image.split(".");
    const extension = imageSplit[1];

    // Comprobar extension
    if (
      extension !== "png" &&
      extension !== "jpg" &&
      extension !== "jpge" &&
      extension !== "gif"
    ) {
      // Si no es correcto, borrar archivo
      const filePath = req.file.path;
      const fileDeleted = fs.unlinkSync(filePath);
      return res.status(400).json({
        status: "error",
        message: "Invalid extension file",
      });
    }

    // Si es correcto guardar en bbdd
    const storedPublicationImg = await Publication.findOneAndUpdate(
      { user: req.authorization.id, _id: publicationId }, // Solamente buscamos publicaciones del usuario logeado
      { file: req.file.filename },
      { new: true }
    ); // filename es el nombre final generado por Multer

    if (!storedPublicationImg) {
      return res.status(400).json({
        status: "error",
        message: "Cant update the image, user not found",
      });
    }
    // Devolver respuesta
    return res.status(200).json({
      status: "success",
      message: "Avatar uploaded with success!",
      user: storedPublicationImg,
      file: req.file,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const media = async (req, res) => {
  try {
    // Sacar el parametro de la url
    const fileMedia = await req.params.file;
    // Montar el path real de la imagen
    const filePath = "./uploads/publications/" + req.params.file;
    // Comprobar que existe
    fs.stat(filePath, () => {
      if (!fileMedia) {
        return res.status(404).json({
          status: "error",
          message: "Cant find image",
        });
      }
      // Devolver un file
      return res.sendFile(path.resolve(filePath));
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// PUBLICATIONS CONTROLLER - FROM USERS FOLLOWED BY THE LOGGED USER

const publicationFeed = async (req,res) => {

  try{
    // Sacar la página actual 
    let page = 1; 

    if (req.params.page) {
      page= req.params.page;
    }
    
    // Establecer número de elementos por página 
    let itemsPerPage = 5; 
    
    // Sacar identificadores de usuarios que yo sigo como usuario logueado
    const myFollows = await followService.followUserIds(req.authorization.id);

    
    const publicationsFollowing = await Publication
    .find({user: myFollows.following,})
    .populate("user", "-password -role -__v -email")
    .sort("created_at"); 

    const total = await publicationsFollowing.paginate(page,itemsPerPage);   

    if(!myFollows || !publicationsFollowing) {
      return res.status(404).json({
        status: "error",
        message: "Cant find the publications feed",
      });
    };
    return res.status(200).json({
      status: "success",
      message: "Publication Feed",
      following: myFollows.following,
      publicationsFollowing,
      total,
      page,
      itemsPerPage,
      pages: Math.ceil(total/itemsPerPage),   
    });

  } catch(error) {
    console.error(error)
    return res.status(400).json({
      status: "error",
      message: "Internal Server Error", 
    });
  };
};

module.exports = {
  test1,
  createPublication,
  getPublication,
  deletePublication,
  getAllUserPublication,
  uploadImgPblctn,
  media,
  publicationFeed,
};
