import mongoose from "mongoose";
import cartModel from "../../models/cart.model.js";
import prodModel from "../../models/prod.model.js";

export class CartManager{
    constructor(){
        console.log("Working with carts using Data Base");
    }

    async getCart(){
        const carroCompra = await cartModel.find().lean();
        return carroCompra;
    }

    async getCartId(cid){
        const cartId = await cartModel.findById(cid);
        return cartId;
    }

    async addNewCart(){
        const newCart = await cartModel.create({});
        return newCart;
    }

    //agrega un prod. al carro y se act.
    async addProductToCart(cid, pid, quantity){
        try {
            const prod = await prodModel.findById(pid);
            const findCart = await cartModel.findById(cid).populate("products.pid");
            const prodExistinCart = findCart.products.findIndex((x) => x.pid._id.toString() === pid);

            if (findCart!==null &&findCart.products!==undefined) {
                if(prodExistinCart!==-1){
                    findCart.products[prodExistinCart].quantity++;
                }else{
                    const newProduct = {
                        pid: prod,
                        quantity: quantity
                    };
                    findCart.products.push(newProduct);
                }
                return await findCart.save(); 
            }else{
                console.log("el carro no existe");
            }

        } catch (error) {
            console.log(error);;
        }

    }

    //se actualiza el carrito con los req.body correspondientes

/*                  Funcion innecesaria
    async updateCart(cid, pid){
        const upCart = await carts.findByIdAndUpdate(cid,
            {$set:{"products.$[product].quantity":quantity}},
            {new: true, arrayFilters:[{"product._id":pid}]}
        ); return upCart;
    }
    
*/
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