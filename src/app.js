import express from "express";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import { mongoose} from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";

import { AutenRouter } from "./routes/autenticacion.roter.js";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import __dirname from "./utils.js";

const app = express();

//bases de datos
const database = "mongodb+srv://fabricioAdmin:12345@coderbackend39700.sarerxd.mongodb.net/prueba1?retryWrites=true&w=majority"


//middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configuracion de la sesion

app.use(session({
    store:MongoStore.create({mongoUrl:database}),
    secret:"claveSecreta",
    resave:true,
    saveUninitialized:true
}))


// MONGO DB

mongoose.connect(database).then((connection)=>{
    console.log("Connected to Data Base!");
})


//path

app.use(express.static(__dirname + "/../public"));

//routes

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);
app.use("/api/sessions", AutenRouter);

//handlebars

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',__dirname+'/views');

const httpServer = app.listen(8080, ()=>{
    console.log("Server listening on port 8080");
});

//sockets

const io = new Server(httpServer)

io.on("connection", (socket)=>{
    console.log("Connected");
})

app.use((req,res,next)=>{
    req.io = io
    next()
})

