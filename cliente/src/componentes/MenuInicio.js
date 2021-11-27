import React, {useEffect,useState} from "react";
import socket from "./Socket";
import "../App.css";
import CrearPartida from "./CrearPartida";
import UnirsePartida from "./UnirsePartida";

const MenuInicio = ({ nombre }) => {
    const [crearpartida,setIsCrearPartida]=useState(false);
    const [unirsepartida,setIsUnirsePartida]=useState(false);

    function EventoCrearPartida(){
        setIsCrearPartida(true);
    }

    function EventoUnirsePartida(){
        setIsUnirsePartida(true);
    }

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
