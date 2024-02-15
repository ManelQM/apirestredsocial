const express = require("express"); 
const router = express.Router(); 
const PublicationController = require("../controllers/publication"); 
const authorization = require("../middlewares/authmiddleware"); 


router.get("/userdemop", PublicationController.test1);
router.post("/createpublication", authorization.auth, PublicationController.createPublication);
router.get("/getpublication/:id?", authorization.auth,PublicationController.getPublication);
router.delete("/deletepublication/:id?",authorization.auth,PublicationController.deletePublication);
router.get("/getpublicationsuser/:id:?", authorization.auth,PublicationController.getAllUserPublication);


module.exports = router;