import express from "express";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import { mongoose} from "mongoose";
import MongoStore from "connect-mongo";
import session, { Cookie } from "express-session";
import passport from "passport";

import { AutenRouter } from "./routes/autenticacion.roter.js";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import __dirname from "./utils.js";
import { initializePassport } from "./config/passport.config.js";
import { options } from "./config/options.js";
import cookieParser from "cookie-Parser";

const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
//configuracion de la sesion

app.use(session({
    store:MongoStore.create({mongoUrl:options.mongoDB.url}),
    secret:"claveSecreta",
    resave:true,
    saveUninitialized:false,
}))

//configuracion de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


// MONGO DB

mongoose.connect(options.mongoDB.url).then((connection)=>{
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

