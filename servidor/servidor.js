/*
Clase Jugador
  Atributos: 
    nickname = nombre del jugador
  Metodos:
    getters
    */
class Jugador{
  constructor (nickname){
      this.nickname=nickname;
  }
  getNickname(){
      return this.nickname;
  }
};

/*
Clase Sala
  Atributos:
    creador = nickname del creador de la partida
    cantidad = cantidad maxima de jugadores en la partida
    identificador = identificador de la sala de juego
    jugador1 = nickname del jugador 1
    jugador2 = nickname del jugador 2
    jugador3 = nickname del jugador 3
    jugador4 = nickname del jugador 4
  Metodos:
    setters y getters
*/
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

//Habilitacion de las conecciones de socket
io.on("connection", (socket) => {
  let nombre;
  
  //llamada del socket que conecta a una usario con el login
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
  
  //llamada al socket que crea una sala de juego
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

  /*
  E:nick de un jugador, identificador de una sala de juego
  S: 
  R:

  */
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
  
  /*
  E: identificador de una sala de juego
  S:
  R:

  */
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

  //llamada bidireccional para anadir a un jugador
  socket.on("Anadir jugador",(nick,id)=>{
    io.emit("Enviar verificasion",anadirJugador(nick,id));
  });

  //llamada bidireccional para recibir una string con los datos de los jugadores en una sala
  socket.on("Enviar jugadores",(id)=>{
    io.emit("Recibir jugadores",stringJugadores(id));
  });

  //llamada bidireccional al socket para mostrar las salas de juego
  socket.on("Enviar salas", () => {
    console.log("Uniendose");
    io.emit("Recibir salas", crearString());
  })

  //llamada bidireccional para validar la cantidad de usuarios unidos a una sala de juego
  socket.on("Enviar id",(id)=>{
    io.emit("Recibir total",validarCant(id));
  })

  /*
  E:identificador de una sala
  S: un 1 si la sala esta llena o un 0 si no lo esta
  R:
  Verificar si una sala de juego esta llena
  */
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

  /*
  E: 
  S: un string con la informacion de todas las salas almacenadas
  R: 
  Crear un string con los datos de todos las salas almacenadas
  */
  function crearString(){
    let res = "";
    let i = 0;
    while(i<=arraySalas.length-1){
      res += "Creador: "+arraySalas[i].getCreador()+" | Identificador: "+arraySalas[i].getIdentificador()+" | Cantidad: "+arraySalas[i].getCantidad()+"\n";
      i++;
    }
    return res;
  }

  //llamada bidireccional al socket que envia lista de los jugadores de una sala de juego
  socket.on("Enviar players", (id)=>{
    io.emit("Recibir players", getterlistaJugadores(id));
  });

  //llamada bidireccional al socket que envia la cantidad limite de jugadores en una sala de juego
  socket.on("Enviar players cant", (id)=>{
    io.emit("Recibir players cant", getterlistaJugadoresCant(id));
  });

  /*
  E: identificador de una sala de juego
  S: la cantidad de la sala con ese identificador
  R: 
  obtener la cantidad de una sala de juego
  */
  function getterlistaJugadoresCant(identificador){
    let i = 0;
    while (i<=arraySalas.length-1) {
      if (arraySalas[i].getIdentificador() === identificador){
        return arraySalas[i].getCantidad(); 
      }
    }
  }

  /*
  E: identificador de una sala de juego
  S: una lista con todos los jugadores en la sala de juego
  R:
  obtener una lista con todos los jugadores unidos 
  */
  function getterlistaJugadores(identificador){
    let i = 0;
    let res = [];
    while(i<=arraySalas.length-1){
      if(arraySalas[i].getIdentificador()===identificador){
        res.push(arraySalas[i].getJugador1());
        res.push(arraySalas[i].getJugador2());
        if (arraySalas[i].getCantidad() === "4"){
          res.push(arraySalas[i].getJugador3());
          res.push(arraySalas[i].getJugador4());
        }
        return res;
      }
    }
  }

});

servidor.listen(5000, () => console.log("Servidor inicializado"));