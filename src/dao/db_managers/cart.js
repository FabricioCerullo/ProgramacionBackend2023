import mongoose from "mongoose";
import cartModel from "../models/cart.model.js";
export default class CartManager{
    constructor(){
        console.log("Working with carts using Data Base");
    }

    async getCart(){
        const carroCompra = await cartModel.find().lean();
        return carroCompra;
    }

    async addNewCart(cart){
        const newCart = await cartModel.create(cart);
        return newCart;
    }

    //agrega un prod. al carro
    async addProductToCart(cid, pid){
        try {
            const findProd = await cartModel.findById(cid).populate("products.pid");
            const prodExist = findProd.products.findIndex((x)=>x.products._id.toString() === pid);
            if(prodExist!==-1){
                findProd.products[prodExist].quantity++;
            }else{
                findProd.products.push({pid:pid, quantity:1});
            }
            return await findProd.save();
        } catch (error) {
            return "hay error loco";
        }

    }

    //se actualiza el carrito con los req.body correspondientes
    async updateCart(cid, pid){
        const upCart = await carts.findByIdAndUpdate(cid,
            {$set:{"products.$[product].quantity":quantity}},
            {new: true, arrayFilters:[{"product._id":pid}]}
        ); return upCart;
    }

    //elimina los prod. de la cart seleccionada
    async deleteCart(cid){
        const cart = await cartModel.findById(cid);
        cart.products.remove({cid});
        return cart.save();
    }

    async deleteProd (cid, pid){
        const prodDelete = await cartModel.updateOne(
            {_id: cid},
            {$pull:{products:{pid:pid}}},
        )
        return prodDelete;
    }
}