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

    async addProductToCart(cid, pid) {
        try {
            const carts = await this.getCart();
            const carro= await this.findCartToID(cid);
            let productExist = carro.products.find((x)=>x.pid===pid);
    
            if (productExist) {
                productExist.quantity++;

                let fProducts = carro.products.filter(p=>p.pid !== productExist.pid);
                fProducts = [...fProducts, productExist];
                carro.products = fProducts;
    
                let cartModif = carts.filter((x)=>x.cid!==cid);
                cartModif = [...cartModif, carro];
                await fs.promises.writeFile(this.path, JSON.stringify(cartModif));
            } else {
                carro.products = [...carro.products, {pid:product.pid, quantity:1}];
                let newCart = carts.filter( c => c.cid !== cid)
                newCart = [...newCart, carro]
                await fs.promises.writeFile(this.path, JSON.stringify(newCart))
    
            }
        } catch (error) {
            return error.toString();
        }

    }


    
}

export default CartManager;