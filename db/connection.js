const mongoose = require("mongoose"); 


const connection = async () => {

    try{
        await mongoose.connect("mongodb://localhost:27017/social_network");
        console.log("Welcome to the DataBase Social Network")

    }catch(error) {
        console.error; 
        throw new Error("DATABASE NOT CONNECTED :(")

    }

}

module.exports = connection