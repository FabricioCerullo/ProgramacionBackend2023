import { json, Router } from "express";

import {checkRole,authMiddleware,viewCart,viewAdministrador,forgotPasswordController,homeRenderProductsController,realTimeProductsRenderController,productIDRenderController,loginController,perfilController,registroController,forgotController} from "../controller/index.controller.js";


const viewsRouter = Router();
viewsRouter.use(json());

                //VISTA DE LOS PRODUCTOS

//vista "home" de los productos
viewsRouter.get("/",homeRenderProductsController)
//vista realTimeProducts
viewsRouter.get("/real-time-products",realTimeProductsRenderController)
//vista de los productos por ID
viewsRouter.get("/product/:pid",productIDRenderController)

            //VISTA DE LOS USUARIOS

viewsRouter.get('/login',loginController)
viewsRouter.get('/perfil', perfilController)
viewsRouter.get('/registro',registroController)
viewsRouter.get('/forgot',forgotController )
viewsRouter.get('/resetPassword',forgotPasswordController)
viewsRouter.get("/admin",authMiddleware,checkRole(['admin']),viewAdministrador)
viewsRouter.get("/cart/:cartId",authMiddleware,viewCart)


export default viewsRouter;

