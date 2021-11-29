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
    getters y getters
*/
class Sala{

    constructor(creador,cantidad,Identificador){
        this.creador=creador;
        this.cantidad=cantidad;
        this.Identificador=Identificador;
        let listaJugadores=[];

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
    setListaJugadores(jugador){
        this.listaJugadores.push(jugador);
    }

    getPosListaJugadores(pos){
        return this.listaJugadores[pos];


    }
}