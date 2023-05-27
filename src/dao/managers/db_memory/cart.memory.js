import fs from 'fs';

export class ManagerCartMemory{
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
        /*
        try {
            
            const carts = await this.getCart();
            const carro= await this.findCartToID(cid);
            let productExist = carro.products.find((x)=>x.pid===pid);
    
            if (productExist) {
                const updateQuantity = 
                productExist.quantity+=1

                let fProducts = carro.products.filter(p=>p.pid !== productExist.pid);
                fProducts = [...fProducts, productExist];
                carro.products = fProducts;
    
                let cartModif = carts.filter((x)=>x.cid!==cid);
                cartModif = [...cartModif, carro];
                await fs.promises.writeFile(this.path, JSON.stringify(cartModif));
            } else {
                carro.products = [...carro.products, {pid:pid, quantity:1}];
                let newCart = carts.filter( c => c.cid !== cid)
                newCart = [...newCart, carro]
                await fs.promises.writeFile(this.path, JSON.stringify(newCart))
    
            }
            

        } catch (error) {
            return error.toString();
        }


        
        const carts = await this.getCart();
        const cartId= await this.findCartToID(cid);
        if (cartId) {
            const cartUse = await carts.find((c) => c.cid === cid);
            let prodInCart = cartUse.products.some((p) => p.pid === pid)
            if (prodInCart) {
                let updateQuantity = cartUse.products.find((p) => p.pid ===pid);
                updateQuantity.quantity++;
                let updateCart = await carts.filter((cart) => cart.cid !==cid);
                updateCart = [...updateQuantity, cartUse];
                await fs.promises.writeFile(this.path, JSON.stringify(updateCart));
                return updateCart;
            }else{
                cartUse.products = [...cartUse.products, {pid:pid, quantity:1}];
                updateCart = await cart.filter((cart) => cart.cid !==cid);
                updateCart = [...updateCart, cartUse];
                await fs.promises.writeFile(this.path, JSON.stringify(updateCart));
                return updateCart;
            }
        }else{
            return console.log("error");
        }
        */
    }


    
}
