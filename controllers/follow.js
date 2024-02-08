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

const unfollow = async (req, res) => {
  try {
    // Recoger id del usuario que se deja de seguir
    let userToUnfollow = req.params.id;
    // Recoger id del usuario logeado
    let userLogId = req.authorization.id;
    // Encontrar las coincidencias y borrar
    const deleteTheFollow = await Follow.find({
      user: userLogId,
      followed: userToUnfollow,
    }).deleteOne();

    if(!deleteTheFollow || !userToUnfollow) {
      return res.status(500).json({
        status: "error",
        message: "Cant unfollow, request error"
      })
    }
    return res.status(200).json({
      status: "success",
      message: "You dont follow this User anymore",
    });
  } catch (error){
    console.error(error); 
    return res.status(404).json({
      status: "error",
      message: "Internal Server Error",
    })
  }
};

// FOLLOW LIST CONTROLLER - USER FOLLOWS A NUMBER OF USERS 

const following = async (req, res) => {

  try {
    // Recoger id del usuario logeado
    let userId = req.authorization.id; 
    // Recoger id por params 
    
    // Pagina elegida, si no la pagina 1 

    // Usuarios por pagina que quiero mostrar 

    // Find a follow, popular datos de los usuarios y paginar con mogoose paginate



  } catch (error) {
    console.error(error); 
    return res.status(404).json({
      status: "error", 
      message: "Internal Server Error",
    })

  }

}

const followed = async (req,res) => {

  try{

  } catch (error) {

    console.error(error); 
    return res.status(404).json({
      status: "error",
      message: "Internal Server Error",
    })

  }
}


module.exports = {
  saveFollow,
  unfollow,
  following,
  followed,
};
