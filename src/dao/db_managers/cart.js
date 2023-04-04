import cartModel from "../models/cart.model.js";
export default class CartManager{
    constructor(){
        console.log("Working with products using Data Base");
    }

    async getCart(){
        const carroCompra = await cartModel.find().lean();
        return carroCompra;
    }

    async addNewCart(){
        const carrAdd  = {
            cid :1,
            products: [],
        }

        const result = await cartModel.create(carrAdd);
        return result;
    }

    async deletProdInCart(cid){
        const cart = await cartModel.find({_id:cid});
        let prodInCart = cart[0].products;
        console.log(prodInCart);
        return prodInCart;
    }


}