import { Router, json } from "express";
import mongoose from "mongoose";

import {initiatePurchase,authMiddleware,createCart,checkRole, getCartController, deleteProdInCartController,addProdInCartController,deleteCartController, purchaseCart} from "../controller/index.controller.js";
const cartRouter = Router();
//const manager = new CartManager();
//const managerProd = new ProductManager();
cartRouter.use(json());

//devuelve todos los carritos 
cartRouter.get('/',getCartController )
//elimina del carro el prod. seleccionado
cartRouter.delete("/:cid/products/:pid",authMiddleware,deleteProdInCartController)
//agrega prod. al carro
//crea la cart.
cartRouter.post("/", createCart)
//agrega prod. y actualiza la cart.
cartRouter.post('/add/:cid/:pid',authMiddleware,addProdInCartController)
//elimina los prod. de la cart.
cartRouter.delete("/:cid",authMiddleware,checkRole(['admin']),deleteCartController)
//ruta purchase
cartRouter.post('/purchase/:cid',authMiddleware,purchaseCart)
cartRouter.get('/initial-purchase',authMiddleware,initiatePurchase)

export default cartRouter;
