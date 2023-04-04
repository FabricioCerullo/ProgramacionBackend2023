import fs from 'fs';

class CartManager{
    #acc=0;
    constructor(){
        this.path="../cartProd.json";
        console.log("Working with products using fileSystem");
    }

    async getCart(){
        try {
            const cart = await fs.promises.readFile(this.path,"utf-8");
            return JSON.parse(cart); 
        } catch (error) {
            return [];
        }
    }

    async addNewCart(cid, products){
        try {
            const carroCompra = {
                cid,
                products,
            }
            const carro = await this.getCart();
            const updateCart = [...carro, carroCompra];
            await fs.promises.writeFile(this.path, JSON.stringify(updateCart))
    
        } catch (error) {
            return "Ha ocurrido un error!"
        }
    }

    async findCartToID(cid) {
        const carts = await this.getCart();
        const cartId =  carts.find((x)=>x.cid===cid);
        if (cartId) {
            return cartId;
        }else {
            return "Ha ocurrido un error, capo!"
        }
    }

    async addProductToCart(cid, product) {
        try {
            let carts = await this.getCart();
            let carro=await this.findCartToID(cid);
            let productExist = carro.products.find((x)=>x.id===id);
    
            if (productExist) {
                productExist.quantity++;
                let fProducts = carro.products.filter(p=>p.id!==productExist.id);
                fProducts = [...fProducts, productExist];
                carts.products = fProducts;
    
                let newCart = carts.filter((x)=>x.id!==id);
                newCart = [...newCart, carro];
                await fs.promises.writeFile(this.path, JSON.stringify(newCart));
            } else {
                carro.products = [...carro.products, {id:product.id, quantity:1}];
                let newCart = carts.filter( c => c.id !== id)
                newCart = [...newCart, carro]
                await fs.promises.writeFile(this.path, JSON.stringify(newCart))
    
            }
        } catch (error) {
            return "Ha ocurrido un error!";
        }

    }


    
}

export default CartManager;