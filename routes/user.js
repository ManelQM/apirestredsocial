const express = require("express"); 
const router = express.Router(); 
const UserController = require("../controllers/user"); 
const auth = require("../middlewares/authmiddleware"); 

router.get("/demo", auth.auth,UserController.test)
router.post("/register",UserController.register); 
router.get("/login", UserController.login); 



module.exports = router;