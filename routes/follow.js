const express = require("express"); 
const router = express.Router(); 
const FollowController = require("../controllers/follow"); 

router.get("/userdemof", FollowController.test2)




module.exports = router;