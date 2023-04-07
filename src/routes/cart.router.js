import { Router, json } from "express";
import {CartManager} from "../dao/index.js";
import {ProductManager} from "../dao/index.js";


const cartRouter = Router();
const manager = new CartManager();
const managerProd = new ProductManager();
cartRouter.use(json());


//devuelve todos los carritos 

cartRouter.get('/', async (req, res)=>{
   const carro = await manager.getCart();
    res.send({status:"sucess", payload: carro});
})

//agrego 1 carro con sus respectivos prod.

cartRouter.post('/', async (req, res)=>{
    const {cid, products} = req.body;
    const newCarr = await manager.addNewCart(cid, products);
    res.send({status:"sucess", payload: newCarr});
})

//busca 1 carro por la cid

cartRouter.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const carro = await manager.findCartToID(parseInt(cid));
        res.send({status:"sucess", payload: carro});
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }

})

//añadir 

cartRouter.post('/:cid/product/:pid', async(req, res)=>{
    const {cid, pid} = req.params;
    const cartid = parseInt(cid);
    const prodid = parseInt(pid);
    const product = await managerProd.getProductById(prodid);
    const newCart = await manager.addProductToCart(product, cartid);
    res.send({status:"sucess", payload: newCart});
})

cartRouter.delete('/:cid/product/:pid', async (req,res)=>{
    const {cid, pid} = req.params;
    const cartid = parseInt(cid);
    const prodid = parseInt(pid);

    let prodDelete = await manager.deleteProductById(prodid);
    res.send({status:"sucess", payload: prodDelete});
})


export default cartRouter;