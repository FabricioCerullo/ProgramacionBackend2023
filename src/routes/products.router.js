import { Router, json} from "express";
import __dirname from "../utils.js";
import prodModel from "../dao/models/prod.model.js";

import {checkRole, getProductsController, getProductIDController,addProductController, deleteProductController, prodDTO} from "../controller/index.controller.js";
const productRouter = Router();

//const manager = new ProductManager();
productRouter.use(json());

//devuelve todos los productos
productRouter.get('/',getProductsController)
//devuelve el prod. con la id indicada
//productRouter.get("/:id",getProductIDController)
//devuelve el DTO de prod. se inhabilito mientras tanto la anterior
productRouter.get("/:id",checkRole(["admin"]), prodDTO)
//se agrega un nuevo prod. 
productRouter.post("/", checkRole(["admin"]),addProductController)
//se elimina el prod. especificado con la id.
productRouter.delete("/:pid",checkRole(["admin"]),deleteProductController)


export default productRouter;