import { json, Router } from "express";
import {ProductManager} from "../dao/index.js";


const viewsRouter = Router();
const manager = new ProductManager();
viewsRouter.use(json());


viewsRouter.get("/", async (req,res)=>{
    const prod = await manager.getProducts()
    res.render("home", {prod})
})


viewsRouter.get("/real-time-products", async (req,res)=>{
    const prod = await manager.getProducts()
    res.render("real-time-products", {prod})             
})

viewsRouter.get("/product/:pid", async (req,res)=>{
    const {pid} = req.query;
    const prod = await manager.getProductById(pid);
    res.render("home", {prod})
})

export default viewsRouter;