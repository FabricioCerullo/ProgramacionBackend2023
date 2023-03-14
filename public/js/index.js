const socket = io();

socket.emit('message', "hola mundo!");

socket.on("message", (data) => {
    alert(data);
});