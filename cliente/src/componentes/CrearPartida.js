import React, {useState,useEffect} from "react";
import socket from "./Socket";
import "../App.css";
import SalaEspera from "./SalaEspera";

/*
E:
S:Un string con un identificador de 5 digitos
R:
Creacion de un string identificador de una sala de juego
*/
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

let id=makeid();
//seccion front-end de la ventana para crear una partida
const CrearPartida=( { nombre } )=>{
    const [cantidad,setCantidad]= useState("");
    const [registrado, setRegistrado] = useState(false);
    let cant;

    //permite la creacion de una sala verificando si se recibe 2 o 4 como cantidad de jugadores
    const registrar = (e) => {
        e.preventDefault();
        if (cantidad !== "") {
            if (cantidad === '2' || cantidad === '4'){
                cant=cantidad;
                socket.emit("Crear sala",nombre,cant,id);
                setRegistrado(true);
            }
        }
    };

    /*useEffect(() => {
     
      socket.emit("Crear sala",nombre,cant,id);
    })*/
    

    return (
        <div className="login-container">
          {!registrado && (
            <form onSubmit={registrar}>
              <div className = 'title-container-label'>Ingrese los datos para crear partida</div>
              <h1 className = 'title-container-label'>Creador: {nombre}</h1>
              <h1 className='title-container-label'> Identificador: {id}</h1>
              <input placeholder='Ingrese la cantidad de jugadores' className = 'input-style' value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
              <button className='submit-button'onClick={registrar}>Crear partida</button>
            </form>
          )}
          {registrado && <SalaEspera identificador={id}/>}
        </div>
    );

};
export default CrearPartida;