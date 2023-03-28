import { json, Router } from "express";
import {ProductManager} from "../dao/index.js";


const viewsRouter = Router();
let manager = new ProductManager();
viewsRouter.use(json());

viewsRouter.get("/", async (req,res)=>{
    const prod = await manager.getProducts()
    res.render("home", {prod})
})

viewsRouter.get("/real-time-products", async (req,res)=>{
    const prod = await manager.getProducts()
    res.render("real-time-products", {prod})             
})

export default viewsRouter;