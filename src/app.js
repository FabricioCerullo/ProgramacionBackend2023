import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import {Server} from "socket.io";
import viewsRouter from "./routes/views.router.js";
import {mongoose} from "mongoose"

const app = express();

app.use(express.static(__dirname + "/../public"))

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',__dirname+'/views');

const httpServer = app.listen(8080, ()=>{
    console.log("Server listening on port 8080");
});

const io = new Server(httpServer)

io.on("connection", (socket)=>{
    console.log("Connected");
})

app.use((req,res,next)=>{
    req.io = io
    next()
})

mongoose.connect("mongodb+srv://fabricioAdmin:12345@coderbackend39700.sarerxd.mongodb.net/prueba1?retryWrites=true&w=majority").then((connection)=>{
    console.log("Connected to Data Base!");
})
