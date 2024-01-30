
const test = (req,res) => {
    return res.status(200).json({
        message: "esto va o que",
        nombre: "nodesocialnetwork"
    })
}

module.exports = {
    test
};