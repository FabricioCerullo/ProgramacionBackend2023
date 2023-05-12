//paso 2 - luego conecta con controller

import ProductManager from "../dao/db_managers/desafioJsBackend.js";
import CartManager from "../dao/db_managers/cart.js";

//MANAGERS
const ManagerP = new ProductManager();
const MangerC = new CartManager();

            //PRODUCTOS

export const addProduct = (product) =>{
    const productAdd = ManagerP.addProduct(product);
    return productAdd;
} 

export const getProduct = () =>{
    const products = ManagerP.getProducts();
    return products;
}

export const deleteProduct = (id) =>{
    const prodDelete = ManagerP.deleteProduct(id);
    return prodDelete; 
}

export const getProdId = (id) =>{
    const prodID = ManagerP.getProductById(id);
    return prodID;
}


                //CARTS

export const getCart = () =>{
    const cart = MangerC.getCart();
    return cart;
}

export const addCart = (cart)=>{
    const newCart = MangerC.addCart(cart);
    return newCart;
}

export const deleteCart = (cid, pid)=>{
    const cartDelete = MangerC.deleteCart(cid, pid);
    return cartDelete;
}

export const deleteProdInCart = (cid, pid)=>{
    const prodDeleteCart = MangerC.deleteProd(cid, pid);
    return prodDeleteCart;
}

export const addProdInCart = (cid, pid)=>{
    const prodAdd = MangerC.addProductToCart(cid, pid);
    return prodAdd;
}

export const updateCart = (cid, pid)=>{
    const upCart = MangerC.updateCart(cid, pid);
    return upCart;
}

                //AUTENTICACION








                //VISTAS