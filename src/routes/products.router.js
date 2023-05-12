import { Router, json} from "express";
import {ProductManager} from "../dao/index.js";
import __dirname from "../utils.js";
import prodModel from "../dao/models/prod.model.js";

import { getProductsController, getProductIDController,addProductController, deleteProductController} from "../controller/index.controller.js";
const productRouter = Router();

//const manager = new ProductManager();
productRouter.use(json());

//devuelve todos los productos
productRouter.get('/',getProductsController)
//devuelve el prod. con la id indicada
productRouter.get("/:id",getProductIDController)
//se agrega un nuevo prod. 
productRouter.post("/", addProductController)
//se elimina el prod. especificado con la id.
productRouter.delete("/:pid",deleteProductController)

export default productRouter;