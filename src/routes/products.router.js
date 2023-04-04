import { Router, json } from "express";
import {ProductManager} from "../dao/index.js";
import __dirname from "../utils.js";
import prodModel from "../dao/models/prod.model.js";

    

const productRouter = Router();


const manager = new ProductManager();
productRouter.use(json());

//devuelve los prod. con el limite, sino los devuelve todos.

productRouter.get('/all', async (req,res) => {
    try {  
        const products = await manager.getProducts();
         const {limit} = req.query;
         const {page} = req.query;


         const prodFilter = await prodModel.paginate(
            {},
            {limit: limit, page: page}
         )
         if (limit||page) { 
            return res.send({status:"sucess", payload: prodFilter});
         } else {
            res.send({status:"sucess", payload: products});
         }
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }
})

//devuelve el prod. con la id indicada

productRouter.get("/:pid", async(req, res) => {
   try {
        const {pid} = req.params;
        const product = await manager.getProductById(parseInt(pid));
        res.send({status:"sucess", payload: product});

    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }

})

//se agrega un nuevo prod. 

productRouter.post("/", async(req, res) => {
    try {
        const {title, description, price, thumbail, code, stock} = req.body;
        const newProd = await manager.addProduct({title, description,price, thumbail, code, stock});
        res.status(201).send({status: "ok", payload: newProd});
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }

})

//se modifica algun elemento del prod. especificado con la id.

productRouter.put("/:pid", async(req, res) => {
    try {
        const {pid} = req.params;
        const id = parseInt(pid);
        await manager.updateProduct(id, req.body);
        res.send({status: "succes", payload: await manager.getProductById(id)});
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }
})


//se elimina el prod. especificado con la id.

productRouter.delete("/:pid", async (req, res)=> {
    try {
        const {pid} = req.params
        const id = parseInt(pid)
        await manager.deleteProduct(id);
        res.send({status: "succes", payload: "Su Producto ha sido elimando exitosamente!"})
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }

})


export default productRouter;