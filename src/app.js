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
import cookieparser from "cookie-parser";
import { connectDB } from "./config/db_Connetions.js";
import { errorIndex } from "./middlewares/error/index.error.js";
import { addLogger , logger} from "./utils/logger.js";
import { Plogger } from "./controller/index.controller.js";
import userRouter from "./routes/users.routes.js";
import { swaggerSpecs } from "./config/options.js";
import swaggerUI from "swagger-ui-express"


const app = express();

const httpServer = app.listen(8080, ()=>{
    console.log("Server listening on port 8080");
});


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());

//configuracion de la sesion
app.use(session({
    store:MongoStore.create({mongoUrl:options.mongoDB.url}),
    secret:options.mongoDB.secret,
    resave:true,
    saveUninitialized:false,
}))

//configuracion de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// MONGO DB
connectDB();

//path
app.use(express.static(__dirname + "/../public"));

//loggers
//app.use(addLogger);


//routes
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);
app.use("/api/sessions", AutenRouter);
app.use("/api/users", userRouter);
app.use("/api/docs", swaggerUI.serve,swaggerUI.setup(swaggerSpecs));

//logger

app.get("/test",Plogger)

//errores
app.use(errorIndex);


//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',__dirname+'/views');


//sockets
const io = new Server(httpServer)

io.on("connection", (socket)=>{
    console.log("Connected");
})

app.use((req,res,next)=>{
    req.io = io
    next()
})

