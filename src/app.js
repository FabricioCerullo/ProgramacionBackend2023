import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import {Server} from "socket.io";

const app = express();

app.use(express.static(__dirname + "/../public"))

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',__dirname+'/views');


app.get('/', (req, res) => {
    res.render('home');
});

/*
app.listen(8080, ()=>{
    console.log("Server listening on port 8080");
});*/

const httpServer = app.listen(8080, ()=>{
    console.log("Server listening on port 8080");
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket)=>{
    console.log("Connection established");


});