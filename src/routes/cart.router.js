import { Router, json } from "express";
import {CartManager} from "../dao/index.js";
import {ProductManager} from "../dao/index.js";
import mongoose from "mongoose";

import { getCartController, deleteProdInCartController,addProdInCartController,updateCartController,deleteCartController} from "../controller/index.controller.js";
const cartRouter = Router();
//const manager = new CartManager();
//const managerProd = new ProductManager();
cartRouter.use(json());

//devuelve todos los carritos 
cartRouter.get('/',getCartController )
//elimina del carro el prod. seleccionado
cartRouter.delete("/:cid/products/:pid",deleteProdInCartController)
//agrega prod. al carro
cartRouter.post('/:cid/:pid',addProdInCartController)
//actualiza la cart.
cartRouter.put('/:cid',updateCartController)
//elimina los prod. de la cart.
cartRouter.delete("/:cid",deleteCartController)

export default cartRouter;