const express = require("express"); 
const router = express.Router(); 
const FollowController = require("../controllers/follow"); 
const authorization = require("../middlewares/authmiddleware"); 


router.post("/followuser",authorization.auth,FollowController.followUser);




module.exports = router;