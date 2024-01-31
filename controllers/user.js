const User = require("../models/user");
const bcrypt = require("bcrypt"); 



const register = async (req, res) => {
  try {
    let params = req.body;
    if (!params.name || !params.email || !params.password || !params.nick) {
      return res.status(400).json({
        status: "error",
        message: "Please complete the required fields",
      });
    }
    
     await User.find({
      $or: [
        { email: params.email.toLowerCase() },
        { nick: params.nick.toLowerCase() },
      ],
    }).exec ((error, users) => {
      if (error)
        return res.status(500).json({
          status: "error",
          message: "Cant find User",
        });
      if (users && users.length >= 1) {
        return res.status(200).send({
          status: "success",
          message: "User exists",
        });

      } else {

        let pwd = bcrypt.hash(params.password,10,)
        params.password = pwd;
        let newUser = new User(params);

        newUser.save((error,userStored) => {
            if(error || !userStored) return res.status(500).send({status: "error", message: "Error trying to register user"})
       
        })

        return res.status(200).json({
          status: "success",
          message: "User registered, welcome to the social network api",
          newUser,
        });
      }
    });

  } catch {
    return res.status(404).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  register,
};
