const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../services/auth"); 

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
        message: "User dont exists",
      });
    } 
    // Encriptar password
   const userPassword =  bcrypt.compareSync(params.password,users.password); 
   if(!userPassword) {
    return res.status(400).json({
        status:"error", 
        message: "Password dont exists",
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

module.exports = {
  register,
  login,
};
