const express = require("express"); 
const router = express.Router(); 
const UserController = require("../controllers/user"); 
const auth = require("../middlewares/authmiddleware"); 


router.get("/register",UserController.register); 
router.post("/login", UserController.login); 



module.exports = router;