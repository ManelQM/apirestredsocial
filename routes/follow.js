const express = require("express"); 
const router = express.Router(); 
const FollowController = require("../controllers/follow"); 
const authorization = require("../middlewares/authmiddleware"); 


router.post("/followuser",authorization.auth,FollowController.saveFollow);
router.delete("/unfollow/:id",authorization.auth,FollowController.unfollow);
router.get("/following/:id?/:page?", authorization.auth,FollowController.following);
router.get("/followed/:id?/:page?", authorization.auth,FollowController.followed);

 


module.exports = router;