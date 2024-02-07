const Follow = require ("../models/follow"); 
const User = require("../models/user"); 

// FOLLOW USER CONTROLLER 
const saveFollow = async (req,res) => {

    try{
        
    //Conseguir datos por body 
    let params = req.body
    // Sacar id del usuario identificado
        const userWhoFollows = req.authorization;
        
    // Crear objeto con modelo follow
       let userToFollow = await new Follow({
        user: userWhoFollows.id,
        followed: params.followed
       }); 

    // Guardar objeto en BD

    const followStored = await userToFollow.save()  
        if(!followStored) {
            return res.status(500).json({
                status: "error",
                message: "Cant follow the user"
            })
        
    }   

       return res.status(200).json({
        status: "success",
        message: "Follow",
        userWhoFollows: req.user,
        follow: followStored,
       })
   

    }catch(error) {
        console.error(error);
        return res.status(404).json({
            status: "error",
            message: "Internal Server Error"
        })

    }
}

module.exports = {
    saveFollow,
}