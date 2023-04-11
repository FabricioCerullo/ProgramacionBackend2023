const socket = io();

const listaProd = document.getElementById("containerProd");
socket.on("newListProd", async(d)=>{
    let prodLista = "";
    await d.forEach((e)=>{
        prodLista+= `
        <ul>
            <li>Producto:${e.title}, Codigo:${e.price}, Precio:${e.price}, Stock:${e.stock}, Categoria:${e.description}</li>
        </ul>    
        `
    });
    listaProd.innerHTML = prodLista;
});


