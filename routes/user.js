const express = require("express"); 
const router = express.Router(); 
const UserController = require("../controllers/user"); 
const authorization = require("../middlewares/authmiddleware"); 

router.get("/demo", authorization.auth,UserController.test)
router.post("/register",UserController.register); 
router.get("/login", UserController.login); 
router.get("/profile/:id",authorization.auth,UserController.getProfile);
router.get("/userslist/:page?",authorization.auth,UserController.getAllUsers);


module.exports = router;