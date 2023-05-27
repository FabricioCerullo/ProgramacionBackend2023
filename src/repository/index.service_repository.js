import { ManagerDAO, CartsDAO } from "../dao/factory.js"

export class RepositoryManager{
    constructor(dao){
        this.dao = dao
    }
                  //PRODUCTOS


   async addProduct(product){
        const productAdd = ManagerDAO.addProduct(product);
        return productAdd;
    } 
    
    async getProduct(){
        const products = ManagerDAO.getProducts();
        return products;
    }
    
    async deleteProduct(id){
        const prodDelete = ManagerDAO.deleteProduct(id);
        return prodDelete; 
    }
    
    async getProdId(id){
        const prodID = ManagerDAO.getProductById(id);
        return prodID;
    }
    
    
                    //CARTS
    
    async getCart(){
        const cart = CartsDAO.getCart();
        return cart;
    }
    
    async addCart(){
        const newCart = CartsDAO.addCart(cart);
        return newCart;
    }
    
    async deleteCart(cid, pid){
        const cartDelete = CartsDAO.deleteCart(cid, pid);
        return cartDelete;
    }
    
    async deleteProdInCart(cid, pid){
        const prodDeleteCart = CartsDAO.deleteProd(cid, pid);
        return prodDeleteCart;
    }
    
    async addProdInCart(cid, pid, quantity){
        const prodAdd = CartsDAO.addProductToCart(cid, pid, quantity);
        return prodAdd;
    }
    /*
    async updateCart(cid, pid){
        const upCart = CartsDAO.updateCart(cid, pid);
        return upCart;
    }
    */
    async getCartId(cid){
        const cartId = await CartsDAO.getCartId(cid);
        return cartId;
    }

    async addNewCart(){
        const newCart = await CartsDAO.addNewCart();
        return newCart;
    }
 
}


export const productService = new RepositoryManager (ManagerDAO);
export const cartService = new RepositoryManager (CartsDAO);
