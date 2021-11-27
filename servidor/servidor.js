
class Jugador{
  constructor (nickname){
      this.nickname=nickname;
  }
  getNickname(){
      return this.nickname;
  }
};
class Sala{

  constructor(creador,cantidad,identificador){
      this.creador=creador;
      this.cantidad=cantidad;
      this.identificador=identificador;
      this.jugador1=creador;
      this.jugador2;
      this.jugador3;
      this.jugador4;

  }
  getCreador(){
      return this.creador;
  }
  getCantidad(){
      return this.cantidad;
  }
  getListaJugadores(){
      return this.listaJugadores;
  }
  setJugador1(jugador1){
      this.jugador1=jugador1;
  }
  setJugador2(jugador2){
    this.jugador2=jugador2;
}
setJugador3(jugador3){
  this.jugador3=jugador3;
}
setJugador1(jugador4){
  this.jugador4=jugador4;
}
  getJugador1(){
    return this.jugador1;
  }
  getJugador2(){
    return this.jugador2;
  }
  getJugador3(){
    return this.jugador3;
  }
  getJugador4(){
    return this.jugador4;
  }
  getIdentificador(){
    return this.identificador;
  }
}

const express = require("express");
const http = require("http");
const app = express();
const servidor = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(servidor);

let arrayJugadores=[];
let arraySalas=[];

io.on("connection", (socket) => {
  let nombre;


  socket.on("conectado", (nomb) => {
    nombre = nomb;
    let i=0;
    let jugador=new Jugador(nombre);
    arrayJugadores.push(jugador);

    /*socket.broadcast.emit("mensajes", {
      nombre: nombre,
    });*/
    while(i<=arrayJugadores.length-1){
      console.log("nombre",arrayJugadores[i].getNickname());
      i++;
    }
  });
  
  socket.on("Crear sala", (creador,cantidad,identificador) => {
    let i=0;
    let sala=new Sala(creador,cantidad,identificador);
    sala.setJugador1(creador);
    arraySalas.push(sala);
    while(i<=arraySalas.length-1){
      
      console.log("Creador: ",arraySalas[i].getCreador(),"Cantidad: " ,arraySalas[i].getCantidad(),"Identificador: ", arraySalas[i].getIdentificador());
      i++;
    }
    /*socket.broadcast.emit("mensajes", {
      nombre: nombre,
    });*/
    //console.log("nombre",arraySalas[0].getNickname());
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