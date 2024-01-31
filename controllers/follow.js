const test2 = (req,res) => {
    return res.status(200).json({
        message: "esto va o que",
        nombre: "followers"
    })
}

module.exports = {
    test2
};