const Publication = require("../models/publication");



const test1 = (req,res) => {
    return res.status(200).json({
        message: "esto va o que",
        nombre: "publications"
    })
}

const createPublication = async (req,res) => {

    try{

        
return res.status(200).json({
    status:"succes",
    message: "Publication created!"
})
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    test1,
    createPublication,
};