const Follow = require("../models/follow");
const User = require("../models/user");

// FOLLOW USER CONTROLLER - USER LOGGED FOLLOWS ANOTHER USER
const saveFollow = async (req, res) => {
  try {
    //Conseguir datos por body
    let params = req.body;

    // Sacar id del usuario identificado
    const userWhoFollows = req.authorization;

    // Crear objeto con modelo follow
    let userToFollow = await new Follow({
      user: userWhoFollows.id,
      followed: params.followed,
    });

    // Guardar objeto en BD
    const followStored = await userToFollow.save();
    if (!followStored) {
      return res.status(500).json({
        status: "error",
        message: "Cant follow the user",
      });
    }
    // Devolver Resultado
    return res.status(200).json({
      status: "success",
      message: "Follow",
      userWhoFollows: req.user,
      follow: followStored,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// UNFOLLOW CONTROLLER 

 const unfollow = async (req,res) => {

    try {
        // Recoger id del usuario logeado
        let userId = req.authorization.id; 
    
        // Recoger id del usuario que se deja de seguir
         let userToUnfollow = req.params.id; 

        // Encontrar las coincidencias y borrar

    } catch {

    }

 }

module.exports = {
  saveFollow,
  unfollow,
};
