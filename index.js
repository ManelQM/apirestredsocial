
// IMPORTAR DEPENDENCIAS 

const connection  = require("./db/connection"); 
const express = require("express"); 
const cors = require("cors"); 

console.log("Welcome to Cyberia, social network api working"); 


// CONEXION BD
connection()
// SERVIDOR NODE
const app = express(); 
const port = 3666;

// CONFIG CORS 
app.use(cors()); 
// CONVERTIR DATOS BODY A OBJETOS JS
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
// CARGAR ROUTES 
const userRoutes = require("./routes/user"); 
const PublicationRoutes = require("./routes/publication"); 
const FollowRoutes = require("./routes/follow"); 

app.use("/socialnet",userRoutes); 
app.use("/socialnet",PublicationRoutes); 
app.use("/socialnet",FollowRoutes); 


app.get("/socialnet", (req,res) => {

    return res.status(200).json({
        "id": 1,
        "nombre": "Manel",
        "web": "socialnetwork"
    })
})

// PONER SERVIDOR A ESCUCHAR PETICIONES HTTP 

app.listen(port,() => {
    console.log("Node server listening at PORT", port)
})