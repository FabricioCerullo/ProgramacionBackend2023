import { ManagerDAO, CartsDAO, UserDao } from "../dao/factory.js"

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
    
    
    //USERS

    async getUser(){
        const users = UserDao.getUsers();
        return users;
    }
    async deleteUsers(id){
        const userDelete = UserDao.deleteUsers(id);
        return userDelete;
    }
 
}

export class CustomError{
    static createError({name="Error", cause, message, errorCode}){
        const error = new Error(message,{cause});
        error.name=name;
        error.code=errorCode;
        //console.log("error", error.cause);
        throw error;
    }
}

export const generateUserInfoError = (user) =>{
    return `Una o mas propiedades ingresadas son invalidas.
    Las propiedades requeridas son:
    first_name : se solicita un dato tipo String, se recibio ${user.first_name}
    last_name : se solicita un dato tipo String, se recibio ${user.last_name}
    age :se solicita un dato tipo Number, se recibio ${user.age}
    `
}

export const generateProdrInfoError = (prod) =>{
    return `Una o mas propiedades ingresadas son invalidas.
    Las propiedades requeridas son:
     title : se solicita un dato tipo String, se recibio ${prod.title}
     description : se solicita un dato tipo String, se recibio ${prod.description}
     price : se solicita un dato tipo Number, se recibio ${prod.price}
     code : se solicita un dato tipo Number, se recibio ${prod.code}
     stock : se solicita un dato tipo Number, se recibio ${prod.stock}
    `
}





export const productService = new RepositoryManager (ManagerDAO);
export const cartService = new RepositoryManager (CartsDAO);
export const userService = new RepositoryManager (UserDao);
