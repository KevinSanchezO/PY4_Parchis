const express = require("express");
const http = require("http");
const app = express();
const servidor = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(servidor);


io.on("connection", (socket) => {
  let nombre;


  socket.on("conectado", (nomb) => {
    nombre = nomb;
    socket.broadcast.emit("mensajes", {
      nombre: nombre,
    });
    console.log("nombre",nombre)
  });


  socket.on("prueba", () => {
    console.log("sigue conectado", nombre)
  });

  socket.on("mensaje", (nombre, mensaje) => {
    io.emit("mensajes", { nombre, mensaje });
  });


  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: `${nombre} ha abandonado la sala`,
    });
  });
});

servidor.listen(5000, () => console.log("Servidor inicializado"));