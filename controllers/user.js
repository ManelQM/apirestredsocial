const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../services/auth"); 



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
    const users = await User.findOne({ email: params.email })
    // .select({
    //   password: 0, }); // metodo que nos permite seleccionar que campos queremos que nos lleguen y cuales no.
    if (!users) { 
      return res.status(404).json({
        status: "error",
        message: "Email or password invalid",
      });
    } 
    // Encriptar password
   const userPassword =  bcrypt.compareSync(params.password,users.password); 
   if(!userPassword) {
    return res.status(400).json({
        status:"error", 
        message: "Bad password",
    })
   }
   const token = jwt.createToken(users); 
    return res.status(200).json({
        status: "success", 
        message: "You are logged, enjoy!",
        users,
        token
    })
    
  } catch (error) {
    console.error(error); 
    return res.status(400).json({
        status: "error",
        message: "Internal Server Error",
    })
  }
};

// GET PROFILE CONTROLLER 

const getProfile = async (req,res) => {

  try{
    // Recibir el parametro 
    const id = req.params.id; 
    // Consulta para sacar los datos del usuario

    const profile = await User.findById(id);  
    if(!profile || !id){
      return res.status(400).json({
        status: "error",
        message: "Who are you?, user dont exists"
      })
    }
    // Devolver profile/resultado 
    return res.status(200).json({
      status: "success", 
      message: "This your profile",
      user: profile,
    })
  }catch(error){
    console.error("Error trying to find profile", error);
    return res.status(404).json({
      status: "error",
      message: "Internal Server Error",
    })
  }

}

module.exports = {
  test,
  register,
  login,
  getProfile,
};
