const express = require("express"); 
const router = express.Router(); 
const multer = require("multer"); 
const UserController = require("../controllers/user"); 
const authorization = require("../middlewares/authmiddleware"); 

// Configuración de subida de archivos; 
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./uploads/avatars/")
    } , 
    filename: (req,file,cb) => {
        cb(null, "avatar-" + Date.now()+"-"+ file.originalname); 
    }
}); 

// Crear storage donde guardaremos los uploads 
const uploads = multer({storage:storage});


router.get("/demo", authorization.auth,UserController.test)
router.post("/register",UserController.register); 
router.get("/login", UserController.login); 
router.get("/profile/:id",authorization.auth,UserController.getProfile);
router.get("/userslist/:page?",authorization.auth,UserController.getAllUsers);
router.put("/update",authorization.auth,UserController.updateUserProfile); 
router.post("/uploadavatar", authorization.auth,[uploads.single("file0")],UserController.uploadAvatar);

module.exports = router;