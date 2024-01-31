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
    },
    
    role: {
        type: String, 
        default: "user_role",
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
