import { Router, json } from "express";
import {CartManager} from "../dao/index.js";
import {ProductManager} from "../dao/index.js";


const cartRouter = Router();
let manager = new CartManager();
cartRouter.use(json());



cartRouter.get('/', async (req, res)=>{
   const carro = await manager.getCart();
    res.send({status:"sucess", payload: carro});
})

cartRouter.post('/', async (req, res)=>{
    await manager.addNewCart();
    res.send({status:"sucess", payload: "carro añadido"});
})

cartRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    let carro = await manager.findCartToID(cid);
    res.send({status:"sucess", payload: carro});
})

cartRouter.post('/:cid/product/:pid', async(req, res)=>{
    const {cid, pid} = req.params;
    const cartid = parseInt(cid);
    const prodid = parseInt(pid);
    let product = await ProductManager.getProductById(prodid);
    await CartManager.addProductToCart(product, cartid);
    res.send({status:"sucess", payload:await manager.findCartToID(cid)});
})

cartRouter.delete('/:cid/product/:pid', async (req,res)=>{
    const {cid, pid} = req.params;
    const cartid = parseInt(cid);
    const prodid = parseInt(pid);

    let prodDelete = await manager.deleteProductById(prodid);
    res.send({status:"sucess", payload: prodDelete});
})

export default cartRouter;