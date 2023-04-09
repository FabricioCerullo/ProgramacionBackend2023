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
        const cart = await cartModel.findById(cid);
        cart.products.push({pid});
        return cart.save();
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
}