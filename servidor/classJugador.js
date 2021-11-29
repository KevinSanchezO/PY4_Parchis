/*
Clase Jugador
  Atributos: 
    nickname = nombre del jugador
  Metodos:
    getters
*/
export class Jugador{
    constructor (nickname){
        this.nickname=nickname;
    }
    getNickname(){
        return this.nickname;
    }
};

