import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";

const app = express();

// Conectar la BD
db.authenticate()
     .then(() => console.log("Base de datos conectada"))
     .catch(error => console.log(error))

// Definir puerto y host para la app
const port = process.env.PORT || 4000;
// Heroku detecta ip no valida y la cambia
const host = process.env.HOST || "0.0.0.0";

// Habilitar PUG
app.set("view engine","pug");

// Obtener el año actual
app.use((req,res,next) => {
     const year = new Date();

     // Definir variable local
     res.locals.actualYear = year.getFullYear();

     res.locals.nombreSitio = "Agencia de Viajes";

     // Ir al siguiente middleware
     next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extends: true }));

// Definir la carpeta publica
app.use(express.static("public"));

// Agregar Router
app.use("/",router);

app.listen(port,host,() => {
     console.log(`El servidor está funcionando en el puerto ${port} - host: ${host}`);
});