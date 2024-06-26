const User = require("../models/user");
const bcrypt = require("bcrypt");
const mongoosePagination = require("mongoose-pagination");
const fs = require("fs");
const path = require("path");
const jwt = require("../services/authService");
const followService = require("../services/followService")
const validate = require("../helpers/validate");

const test = (req, res) => {
  return res.status(200).json({
    mensaje: "Esto es para ver si funciona el middleware auth/token",
  });
};

// REGISTER CONTROLLER

const register = async (req, res) => {
  try {
    const params = req.body;

    if (!params.name || !params.email || !params.password || !params.nick) {
      return res.status(400).json({
        status: "error",
        message: "Please complete required fields",
      });
    }

    validate(params); // Función validación campos registro
    if(!validate) {
      return res.status(404).json({
        status: "error",
        message: "VALIDATE ERROR",
      })
    }

    const users = await User.find({
      $or: [
        { email: params.email.toLowerCase() },
        { nick: params.nick.toLowerCase() },
      ],
    });

    if (users && users.length >= 1) {
      return res.status(400).json({
        status: "error",
        message: "User exists",
      });
    }

    const hashedPassword = await bcrypt.hash(params.password, 10);
    params.password = hashedPassword;

    const newUser = new User(params);
    const userStored = await newUser.save();

    if (!userStored) {
      return res.status(500).json({
        status: "error",
        message: "Error trying to register user",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User registered, welcome to the social network api",
      newUser: userStored,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// LOGIN CONTROLLER

const login = async (req, res) => {
  try {
    let params = req.body;

    if (!params.email || !params.password) {
      return res.status(400).json({
        status: "error",
        message: "Please complete the required fields",
      });
    }
    const users = await User.findOne({ email: params.email });
    // .select({
    //   password: 0, }); // metodo que nos permite seleccionar que campos queremos que nos lleguen y cuales no.
    if (!users) {
      return res.status(404).json({
        status: "error",
        message: "Email or password invalid",
      });
    }
    // Encriptar password
    const userPassword = bcrypt.compareSync(params.password, users.password);
    if (!userPassword) {
      return res.status(400).json({
        status: "error",
        message: "Bad password",
      });
    }
    const token = jwt.createToken(users);
    return res.status(200).json({
      status: "success",
      message: "You are logged, enjoy!",
      users,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// GET PROFILE CONTROLLER

const getProfile = async (req, res) => {
  try {
    // Recibir el parametro
    const id = req.params.id;
    // Consulta para sacar los datos del usuario

    const profile = await User.findById(id);
    if (!profile || !id) {
      return res.status(400).json({
        status: "error",
        message: "Who are you?, user dont exists",
      });
    }

    const listOfFollowsAndFollowers = await followService.followThisUser(
      req.authorization.id,
      id
    );

    // Devolver profile/resultado
    return res.status(200).json({
      status: "success",
      message: "This is your profile",
      user: profile,
      following: listOfFollowsAndFollowers.following,
      follower: listOfFollowsAndFollowers.follower,
    });
  } catch (error) {
    console.error("Error trying to find profile", error);
    return res.status(404).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    //Controlar en que pagina estamos
    let page = 1;
    if (req.params.page) {
      page = req.params.page;
    }
    page = parseInt(page);
    //consulta con mongoose pagination
    let itemsPerPage = 5;
    const findUser = await User.find().sort("_id").paginate(page, itemsPerPage);
    if (!findUser || !page) {
      return res.status(400).json({
        status: "error",
        message: "Empty list",
      });
    }
    //Obtenemos además una lista dentro de la lista total de usuarios en la cual aparecen los usuarios que sigo y que me siguen
    let followUserIds = await followService.followUserIds(req.authorization.id);
    //Devolver Resultado

    return res.status(200).json({
      status: "success",
      message: "Users list",
      findUser,
      page,
      itemsPerPage,
      pages: Math.ceil(User / itemsPerPage),
      userFollowing: {
        message: "SIGUIENDO",
        data: followUserIds.following,
      },
      userFollowMe: {
        message: "SEGUIDORES",
        data: followUserIds.followers,
      },
    });
  } catch (error) {
    console.error("ERROR", error);
    return res.status(404).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    let profile = req.body;
    const editedProfile = await User.findOneAndUpdate(
      { email: req.authorization.email },
      { name: profile.name, surname: profile.surname, nick: profile.nick },
      { new: true } // Para obtener el documento actualizado
    );

    if (!editedProfile) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User has been updated",
      user: editedProfile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Can't update User",
    });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    // Recoger fichero de imagen y comprobar que existe
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
    const storedUserAvatarImg = await User.findOneAndUpdate(
      { _id: req.authorization.id },
      { image: req.file.filename },
      { new: true }
    ); // filename es el nombre final generado por Multer

    if (!storedUserAvatarImg) {
      return res.status(400).json({
        status: "error",
        message: "Cant update the image, user not found",
      });
    }
    // Devolver respuesta
    return res.status(200).json({
      status: "success",
      message: "Avatar uploaded with success!",
      user: storedUserAvatarImg,
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

const getAvatar = async (req, res) => {
  try {
    // Sacar el parametro de la url
    const fileAvatar = await req.params.file;
    // Montar el path real de la imagen
    const filePath = "./uploads/avatars/" + req.params.file;
    // Comprobar que existe
    fs.stat(filePath, () => {
      if (!fileAvatar) {
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
    return res.status(404).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  test,
  register,
  login,
  getProfile,
  getAllUsers,
  updateUserProfile,
  uploadAvatar,
  getAvatar,
};
