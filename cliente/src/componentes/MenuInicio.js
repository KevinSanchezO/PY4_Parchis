import React, {useEffect,useState} from "react";
import socket from "./Socket";
import "../App.css";
import CrearPartida from "./CrearPartida";
import UnirsePartida from "./UnirsePartida";

//menu de inicio
const MenuInicio = ({ nombre }) => {
    const [crearpartida,setIsCrearPartida]=useState(false);
    const [unirsepartida,setIsUnirsePartida]=useState(false);

    //setea como true la constante crearpartida
    function EventoCrearPartida(){
        setIsCrearPartida(true);
    }

    //setea como true la constante unirsepartida
    function EventoUnirsePartida(){
        setIsUnirsePartida(true);
    }

    //llamada al socket para registrar un usuario
    useEffect(() => {
        socket.emit("conectado", nombre);
    }, [nombre]);

  return (
    <div className="login-container">
        {!crearpartida && !unirsepartida && (
            <div >
                <div className = 'title-container-label'>Seleccione una opcion {nombre}</div>
                    <button onClick = {EventoCrearPartida} className= 'submit-button'>Crear partida</button>
                    <button onClick = {EventoUnirsePartida} className= 'submit-button'>Unirse a partida</button>
                    <button className= 'submit-button'>Ranking</button>
            </div>
        )} 
    {unirsepartida && <UnirsePartida nombre={nombre}/>}
    {crearpartida && <CrearPartida nombre={nombre} />}
    </div>
  );
};

export default MenuInicio;
