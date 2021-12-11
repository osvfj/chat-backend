module.exports = function (sockets) {
  sockets.on("connection", (socket) => {

    console.log(socket.id);
    
    socket.on("FromAPI", (data) =>{
        socket.join(data);
        console.log(data);
        socket.emit('enviar', "Hola de vuelta");
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
