import { Router, json} from "express";
import __dirname from "../utils.js";
import prodModel from "../dao/models/prod.model.js";

import {checkRole, getProductsController, mockingProducts,addProductController, deleteProductController, prodDTO} from "../controller/index.controller.js";
const productRouter = Router();

productRouter.use(json());

//devuelve todos los productos
productRouter.get('/',getProductsController)
//ruta de mocking, genera 100 products
productRouter.get("/mockingproducts’", mockingProducts)
//devuelve el prod. con la id indicada
//productRouter.get("/:id",getProductIDController)--INHABILITADO
//devuelve el DTO de prod. se inhabilito mientras tanto la anterior
productRouter.get("/:id", prodDTO)
//se agrega un nuevo prod. 
productRouter.post("/",addProductController)
//se elimina el prod. especificado con la id.
productRouter.delete("/:pid",deleteProductController)


export default productRouter;
