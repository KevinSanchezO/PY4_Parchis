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
      this.contador=2;
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
setContador(){
  this.contador++;
}
getContador(){
  return this.contador;
}
setJugador3(jugador3){
  this.jugador3=jugador3;
}
setJugador4(jugador4){
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

//source: https://github.com/Re-On-Media/reon-media-chat
//estructura del uso de sockets
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
  });
  function anadirJugador(nick,id){
    let i=0;
    let band="";
    while(i<=arraySalas.length-1){
      if(arraySalas[i].getIdentificador()===id){
        if(arraySalas[i].getContador()===2){
          arraySalas[i].setJugador2(nick);
          arraySalas[i].setContador();
          band+="2";
        }else{
          if(arraySalas[i].getContador()===3 && arraySalas[i].getCantidad()==="4"){
            arraySalas[i].setJugador3(nick);
            arraySalas[i].setContador();
            band+="2";
          }else{
            if(arraySalas[i].getContador()===4 && arraySalas[i].getCantidad()==="4"){
              arraySalas[i].setJugador4(nick);
              arraySalas[i].setContador();
              band+="2";
            }
          }
        }
      }
      i++;

    }
    return band;
  }
  
function stringJugadores(ident){
    let i=0;
    let f=0;
    let j=2;
    let res="";
    while(i<=arraySalas.length-1){
      if(arraySalas[i].getIdentificador()===ident){
          if(f===0){
            res+="Creador: "+arraySalas[i].getCreador()+" | Identificador: "+arraySalas[i].getIdentificador()+" | Cantidad: "+arraySalas[i].getCantidad()+"\n";
            f++;
          }
           
            while(arraySalas[i].getContador()>j){
              if(j===2){
                res+="Jugador "+"2: "+arraySalas[i].getJugador2()+ "\n";
                j++;
              }else{
                if(j===3){
                  res+="Jugador "+"3: "+arraySalas[i].getJugador3()+ "\n";
                  j++;
                }else{
                  if(j===4){
                    res+="Jugador "+"4: "+arraySalas[i].getJugador4()+ "\n";
                    j++;
                  }
                }
              }
               
            }
           
          
        //}
      }
      i++;
    }
    
    return res;
  }

  socket.on("Anadir jugador",(nick,id)=>{
    io.emit("Enviar verificasion",anadirJugador(nick,id));
  });

//unirsePrtida
socket.on("Enviar jugadores",(id)=>{
  io.emit("Recibir jugadores",stringJugadores(id));
});


  socket.on("Enviar salas", () => {
    console.log("Uniendose");
    io.emit("Recibir salas", crearString());
  })
socket.on("Enviar id",(id)=>{
  io.emit("Recibir total",validarCant(id));
})

  function validarCant(identificador){
    let i=0;
    while(i<=arraySalas.length-1){
      if(arraySalas[i].getIdentificador()===identificador){
        console.log((arraySalas[i].getContador()-1).toString(), arraySalas[i].getCantidad());
        if((arraySalas[i].getContador()-1).toString()===arraySalas[i].getCantidad()){
          return "1";
        }else{
          return "0"
        }
      }
      i++;
    }
  }
  function crearString(){
    let res = "";
    let i = 0;
    while(i<=arraySalas.length-1){
      res += "Creador: "+arraySalas[i].getCreador()+" | Identificador: "+arraySalas[i].getIdentificador()+" | Cantidad: "+arraySalas[i].getCantidad()+"\n";
      i++;
    }
    return res;
  }

});

servidor.listen(5000, () => console.log("Servidor inicializado"));