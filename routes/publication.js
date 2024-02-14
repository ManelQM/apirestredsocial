const express = require("express"); 
const router = express.Router(); 
const PublicationController = require("../controllers/publication"); 
const authorization = require("../middlewares/authmiddleware"); 


router.get("/userdemop", PublicationController.test1);
router.post("/createpublication", authorization.auth, PublicationController.createPublication);




module.exports = router;