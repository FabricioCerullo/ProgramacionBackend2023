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

const listaUsers = document.getElementById("users");
socket.on("newListUser", async(d)=>{
    let userList = "";
    await d.forEach((e)=>{
        userList+= `
        <ul>
            <li>first_name:${e.first_name}, last_name:${e.last_name}, email:${e.email}, role:${e.role}</li>
        </ul>    
        `
    });
    listaUsers.innerHTML = userList;
});


const deleteUser = document.getElementById("deleteForm").addEventListener("submit",async function(event) {
    event.preventDefault();
    const userID=document.getElementById("userId").value;
    const response = await fetch(`/api/users/delete`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID })
    });
    if (response.ok) {
        const data = await response.json();
        document.getElementById("message").textContent = data.message;
    } else {
        document.getElementById("message").textContent = "Error al eliminar el usuario.";
    }
});

const changeRoleUser = document.getElementById("changeRoleForm").addEventListener("submit",async function(event) {
    event.preventDefault();
    const userID=document.getElementById("userIdRole").value;
    const response = await fetch(`/api/users/premium`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID })
    });
    if (response.ok) {
        const data = await response.json();
        document.getElementById("messageRole").textContent = data.message;
    } else {
        document.getElementById("messageRole").textContent = "Error al modificar el usuario.";
    }
})



