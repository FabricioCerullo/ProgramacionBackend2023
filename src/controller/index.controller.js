//paso 3 - luego conecta con router, ya resumido en una sola funcion
import { userModel } from "../dao/models/user.model.js";
import prodModel from "../dao/models/prod.model.js";
import { createHash, isValidPassword } from "../utils.js";
import { GetProductDTO , GetUserDTO} from "../dao/dto/index.dto.js";
import {productService, cartService} from "../repository/index.service_repository.js"
import { v4 as uuidv4 } from 'uuid';
import { ticketModel } from "../dao/models/ticket.model.js";
import { transporter } from "../config/gmail.js";


                    //PRODUCTOS

export const getProductsController = async (req,res) => {
    try {
        const products =  productService.getProduct();
         const {limit} = req.query;
         const {page} = req.query;
         const prodFilter = await prodModel.paginate(
            {},
            {limit: limit, page: page}
         )
         if (limit||page) { 
            return res.send({status:"sucess", payload: prodFilter});
         } else {
            res.send({status:"sucess", payload: products});
         }
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }
}

export const getProductIDController = async (req, res) => {
    try {
         const { id } = req.params;
         const product = await productService.getProductById(parseInt(id));
         res.send({status:"sucess", payload: product});
     } catch (error) {
         res.status(404).send({status: "error", error: "Ha ocurrido un error!2"});
     }
 
 }

 export const addProductController = async(req, res) => {
    try {
        const {title, description, price, thumbail, code, stock} = req.body;
        const newProd = await productService.addProduct({title, description,price, thumbail, code, stock});
        res.status(201).send({status: "ok", payload: newProd});
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }

}

export const deleteProductController = async (req, res)=> {
    try {
        const {pid} = req.params
        const id = parseInt(pid)
        await productService.deleteProduct(id);
        res.send({status: "succes", payload: "Su Producto ha sido elimando exitosamente!"})
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }
}


                            //DTO

export const prodDTO = async (req, res) => {
    try {
        const { id } = req.params;
        const prod = await productService.getProdId(id);
        console.log(prod);
        const result = new GetProductDTO(prod);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

                        //CARTS

export const getCartController = async (req, res)=>{
    const carro = await cartService.getCart();
     res.send({status:"sucess", payload: carro});
 }

export const deleteProdInCartController =  async (req, res)=>{
    const {cid,pid} = req.params;
    const prodDel = await cartService.deleteProdInCart(cid, pid);
    res.send({status:"success", payload: prodDel});

}

export const createCart = async (req, res)=>{
    try {
        const cartCreated = await cartService.addNewCart();
        console.log(cartCreated);
    } catch (error) {
        console.log(error);
    }
}

export const addProdInCartController = async (req, res)=>{
    try {
        const {cid, pid} = req.params;
        const {quantity} = req.body;
        const result = await cartService.addProdInCart(cid, pid, quantity);
        res.send({status:"success", payload: result});
    } catch (error) {
        console.log(error);
    }

}
/*
        Funcion innecesaria
export const updateCartController =  async (req, res)=>{
    const {cid,pid} = req.params;
    const result = await cartService.updateCart(cid,pid);
    res.send({status:"success", payload: result});
}
*/

export const deleteCartController = async (req, res) => {
    const {cid} = req.params;
    const result = await cartService.deleteCart(cid);
    res.send({status:"success", payload: result});
}

//para ruta purchase
export const purchaseCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartService.getCartId(cartId);
        const ticketProductsAvailable = [];
        const  ticketProductsNotAvailable = [];

        if (cart) {
            if (!cart.products.length) {
                console.log("tiene agregar productos al carro antes de hacer la compra!");
            }
            for(let i = 0; i < cart.products.length; i++) {
                const cartProduct = cart.products[i];
                const prodDB = await productService.getProdId(cartProduct.pid);
                //comparar cantidad del prod. en el carro con el stock
                if (cartProduct.quantity<=prodDB.stock) {
                    ticketProductsAvailable.push(cartProduct);
                }else{
                    ticketProductsNotAvailable.push(cartProduct);
                }
            }
            console.log("ticketProductsAvailable",ticketProductsAvailable);
            console.log("ticketProductsNotAvailable",ticketProductsNotAvailable);

            const Totalamonunt = ticketProductsAvailable.reduce((acc, product) => {
                const prodAmount = product.pid.price * product.quantity;
                return acc+prodAmount;
            },0);

            const newTicket = {
                code:uuidv4(),
                purchase_datetime:new Date().toLocaleString(),
                amount: Totalamonunt,
                purchaser:req.user
            }
            console.log(req.user);
            //const ticketCreated = await ticketModel.create(newTicket);
            //res.send(ticketCreated);
        }else{
            console.log("el carro no existe!");
        }
    } catch (error) {
        console.log(error);
    }
}


                //VISTAS

export const homeRenderProductsController = async (req,res)=>{
    const prod = await productService.getProduct();
    res.render("home", {prod})
}

export const realTimeProductsRenderController = async (req,res)=>{
    const prod = await productService.getProduct();
    res.render("real-time-products", {prod})             
}

export const productIDRenderController = async (req,res)=>{
    const {pid} = req.query;
    const prod = await productService.getProdId(pid);
    res.render("home", {prod});
}

                //VISTAS DE USUARIOS

export const loginController = (req, res) => {
    res.render("login");
}               

export const perfilController = (req, res) => {
    res.render("perfil");
}

export const registroController = (req, res) => {
    res.render("registro");
}

export const forgotController = (req, res) => {
    res.render("forgot");
}

                //REDIRECCIONES DE USUARIOS

export const registroRedirectController =  async (req, res) => {
    res.redirect("/login");
}

export const loginRedirectController = async (req, res) => {
    res.redirect("/perfil");
}

export const failedRedirectController = async (req, res) => {
    console.log("falla!... algo salio mal");
    res.status(500).send("error");
}

export const gitHubRedirectController = async (req,res)=>{
    req.session.user = req.user;
    //console.log(req.session.user = req.user);
    res.redirect("/");
}

export const currentRedirectController = (req, res,next) => {
    res.status(200).json({ user: new GetUserDTO(req.user) });
    next();
}

//middleware para verificar el tipo de rol del usuario en la session
export const checkRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            console.log(req.user);
            return res.json({ status: "error", message:"necesitas estar autenticado"});
        }
        if (!role.include(req.user.role)) {
            return res.json({ status: "error", message:"no estas autorizado"});
        }
        next();
    }
}

export const forgotRedirectController =  async(req, res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email:email});

        if (user) {
            user.password = createHash(password);
            const userUpdate = await userModel.findOneAndUpdate({email:user.email}, user);
            res.status(200).send("Contraseña actualizada!")

        }else{
           res.status(401).send("no existe el correo");
        }
    } catch (error) {
        res.status(401).send("error");
    }

}

export const logoutRedirectController = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Internal server error");
          }
          res.redirect("/login");
    })
}

                    //MIDDLEWARE DE AUTENTICACION

export const authMiddleware = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            const userId = req.session.passport.user;
            const user =await userModel.findById(userId)
              if (!user) return res.status(401).json({ error: 'No se ha iniciado sesión.' });
              req.user = user;
              next();
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el middleware de autenticación.' });
    }
}                    


                        //nodemailer