const express = require("express"); 
const router = express.Router(); 
const PublicationController = require("../controllers/publication"); 
const authorization = require("../middlewares/authmiddleware"); 
const multer = require("multer"); 


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./uploads/publications/")
    } , 
    filename: (req,file,cb) => {
        cb(null, "pblctn-" + Date.now()+"-"+ file.originalname); 
    }
}); 

// Crear storage donde guardaremos los uploads 
const uploads = multer({storage:storage});

router.get("/userdemo", PublicationController.test1);
router.post("/createpublication", authorization.auth, PublicationController.createPublication);
router.get("/getpublication/:id?", authorization.auth,PublicationController.getPublication);
router.delete("/deletepublication/:id?",authorization.auth,PublicationController.deletePublication);
router.get("/getpublicationsuser/:id?", authorization.auth,PublicationController.getAllUserPublication);
router.post("/uploadimg/:id?",authorization.auth,[uploads.single("file0")],PublicationController.uploadImgPblctn); 
router.get("/media/:file",authorization.auth,PublicationController.media);
module.exports = router;