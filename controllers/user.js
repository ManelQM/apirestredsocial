
const test = (req,res) => {
    return res.status(200).json({
        message: "esto va o que",
        nombre: "nodesocialnetwork"
    })
}

const register = async (req, res) => { 
    try {
       let params = req.body;
    }catch(error){
      
    }

}
 
module.exports = {
    test,
    register,
};