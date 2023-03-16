const socket = io();

const datosProd = document.getElementById("listaProd");
socket.on("listaProd", async(d)=>{
    let prodLista = "";
    await d.forEach((e)=>{
        prodLista+= `
        <ul>
            <li>Producto:${e.title}, Codigo:${e.price}, Precio:${e.price}, Stock:${e.stock}, Categoria:${e.description}</li>
        </ul>    
        `
    });
    datosProd.innerHTML = prodLista;
});