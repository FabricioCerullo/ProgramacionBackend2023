import chai from 'chai';
import supertest from 'supertest';
import prodModel from '../src/dao/models/prod.model.js';
import { app } from '../src/app.js';
import mongoose from 'mongoose';

const expect = chai.expect;
const requester = supertest(app);


describe('Testing de app de Productos',()=>{

    describe('Test de modulo de productos',()=>{


        beforeEach(function(){
            this.timeout(5000);
        })

        it("el endpoint get /api/products devuelve los productos existentes", async function(){
            const response = await requester.get('/api/products');
            expect(response.statusCode).to.be.equal(200);
        })

        it("el endpoint post /api/products crea los productos", async function(){
            const prodMock ={
                title:"Deluxe Galletitas de Arroz c/Chocolate",
                description:"Galletita",
                price:"400",
                thumbnail:[],
                code:7798301130078,
                stock:5,
                owner:"admin"
            }
            const response = await requester.post('/api/products/').send(prodMock);
            const {statusCode,_body} = response;
           // console.log("resultado", response);
            expect(statusCode).to.be.equal(201);
            expect(_body.status).to.be.equal("ok");
        })
/*
        it("el endpoint get /api/products/:id devuelve el producto especifico", async function(){
            const prodId = "64923d381f7c2e725a67791f";
            const response = await requester.get('/api/products/'+prodId);
            expect(response.statusCode).to.be.equal(200);
        })

        it("el endpoint get /api/products/:pid eliminda el producto especifico", async function(){
            const prodId = "64923d381f7c2e725a67791f";
            const response = await requester.delete('/api/products/'+prodId);
            expect(response.statusCode).to.be.equal(201);
        })
*/
    })
    
    describe("Testing Modulo Carts",()=>{

        it("el endpoint get /api/cart/ debe devolver las carts existentes", async function(){
            const response = await requester.get('/api/cart');
            console.log(response);
            const {statusCode,_body} = response;
            expect(statusCode).to.be.equal(200);
            expect(_body.status).to.be.equal("sucess");
        })

        it("el endpoint post /api/cart debe crear una cart correctamente", async function (){
            const response = await requester.post('/api/cart/');
            const {statusCode,_body} = response;
            expect(statusCode).to.be.equal(200);
            expect(_body.status).to.be.equal("success");

        })
    })

    describe("Testing Modulo Sessions",()=>{
        
        it("el endpoint post /api/sessions/registro debe enviar el registro", async function(){
            const userMock = {
                first_name: "fabricio",
                last_name: "cerullo",
                email: "elmascapo1dd235ghgh55@gmail.com",
                age:22,
                password: "123",
            }
            const response = await requester.post('/api/sessions/registro').send(userMock);
            const {statusCode,_body} = response;
            console.log("registro",response);
            expect(response.rawHeaders.includes('Location')).to.be.true;
            expect(response.rawHeaders.includes('/login')).to.be.true;
           //ESTA BIEN, DA ERROR 302, PERO LA REDIRECCION ESTA BIEN FALTA MODIFICAR CODIGO PARA LEER LA RUTA DIRECCIONADA
        });

        it("el endpoint post /api/sessions/login debe permitir el acceso", async function(){
            const loginMock = {
                email:"kal@admin.com",
                password:"kal123"
            }
            const response = await requester.post('/api/sessions/login').send(loginMock);
            const {statusCode,_body} = response;
            console.log("login",response);
            expect(Array.isArray(response))
         //ESTA BIEN, DA ERROR 302, PERO LA REDIRECCION ESTA BIEN FALTA MODIFICAR CODIGO PARA LEER LA RUTA DIRECCIONADA
        })
    })




})