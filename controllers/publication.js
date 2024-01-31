const test1 = (req,res) => {
    return res.status(200).json({
        message: "esto va o que",
        nombre: "publications"
    })
}

module.exports = {
    test1
};