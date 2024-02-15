const {Schema, model} = require("mongoose"); 

const UserSchema = Schema({

    name: {
        type: String, 
        required: true, 
    },

    surname: {
        type: String, 
    },

    nick: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },

    password: {
        type: String,
        required: true,
        // select: false,
    },
    
    role: {
        type: String, 
        default: "user_role",
        // select: false,
    },

    image: {
        type: String,
        default: "default.png",
    },

    created_at: {
        type: Date,
        default: Date.now
    },

});

module.exports = model("User", UserSchema, "Users"); // Mongoose por defecto toma el nombre del Schema así: users(minusculas y en plural); 
