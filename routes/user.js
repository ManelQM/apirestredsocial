const express = require("express"); 
const router = express.Router(); 
const UserController = require("../controllers/user"); 

router.get("/userdemo", UserController.test)




module.exports = router;