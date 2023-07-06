import chai from 'chai';
import supertest from 'supertest';
import prodModel from '../src/dao/models/prod.model.js';

const expect = chai.expect;
const requester = supertest("http://localhost:8080");


describe('Testing de app de Productos',()=>{

    describe('Test de modulo de productos',()=>{
        
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

        it("el endpoint get /api/products/:id devuelve el producto especifico", async function(){
            const prodId = "64923d381f7c2e725a67791f";
            const response = await requester.get('/api/products/'+prodId);
            expect(response.statusCode).to.be.equal(201);
        })

        it("el endpoint get /api/products/:pid eliminda el producto especifico", async function(){
            const prodId = "64923d381f7c2e725a67791f";
            const response = await requester.delete('/api/products/'+prodId);
            expect(response.statusCode).to.be.equal(201);
        })

    })
    
    describe("Testing Modulo Carts",()=>{

        

    })

    describe("Testing Modulo Sessions",()=>{
        
    })




})