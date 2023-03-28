import prodModel from "../models/prod.model.js";
export default class ProductManager{

    constructor(){
        console.log("Working with products using fileSystem");
    }

    async addProduct(prod){
        const addProd = await prodModel.create(prod);
        return addProd;
    }

    async getProducts(){
        const prod = await prodModel.find().lean();
        return prod;
    }


    async getProductById(){}

    async updateProduct(){}
}