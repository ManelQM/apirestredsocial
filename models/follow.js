const {Schema , model} = require("mongoose"); 

const FollowSchema = Schema({
    user: {
        type: Schema.ObjectId, // Aqui establecemos la relación entre el seguidor y el seguido
        ref: "User" // Modelo al que hace referencia
    }, 
    followed: {
        type: Schema.ObjectId,
        ref: "User"
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})

module.exports = model("Follow", FollowSchema, "Follows"); // Entidad, Schema, Coleccion en BD 