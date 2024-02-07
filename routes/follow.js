const express = require("express"); 
const router = express.Router(); 
const FollowController = require("../controllers/follow"); 
const authorization = require("../middlewares/authmiddleware"); 


router.post("/followuser",authorization.auth,FollowController.saveFollow);




module.exports = router;