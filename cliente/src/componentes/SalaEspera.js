import React, {useState,useEffect} from "react";
import socket from "./Socket";
import TableroParchis from "./TableroParchis"
import "../App.css";

//seccion para la sala de espera
const SalaEspera=({identificador})=>{
    const [registrado, setRegistrado] = useState(false);
    const [infoJugadores, setinfoJugadores] = useState("");

    //recibe los datos de los jugadores que se unen a la sala de espera
    const registrar = (e) => {
        e.preventDefault();
        socket.emit("Enviar id", identificador);
        socket.on("Recibir total",total=>{
            console.log("MI TOTAL: ",total);
            if (total==="1") {
                setRegistrado(true);
             }else{
                 console.log("mmmmmm:")
                 socket.emit("Enviar jugadores", identificador);
                 socket.on("Recibir jugadores", jugadores => {
                     setinfoJugadores(jugadores);
                   })
             }
        });  
    };
    /*useEffect(() => {
        socket.emit("Enviar jugadores", identificador);
      });
    
      useEffect(() => {
        socket.on("Recibir jugadores", jugadores => {
          setinfoJugadores(jugadores);
        })
      });*/
      
    return(
        <div className='login-container'>
            {!registrado &&(
            <form onSubmit={registrar}>
                <textarea placeholder = {infoJugadores} className = 'textarea-style' disabled
                    name=""
                    id=""
                    cols="80"
                    rows="20"
                    
               ></textarea>
                <div className='title-container-label'>Sala de espera</div>
                <button onClick={registrar} className='submit-button'>A Jugar!!</button>
            </form>
            )}
            {registrado && <TableroParchis identificador={identificador}/>}
        </div>
    )

}
export default SalaEspera;