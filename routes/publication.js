const express = require("express"); 
const router = express.Router(); 
const PublicationController = require("../controllers/publication"); 

router.get("/userdemop", PublicationController.test1)




module.exports = router;