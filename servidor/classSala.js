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