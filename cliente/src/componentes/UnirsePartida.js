import React, {useState,useEffect} from "react";
import socket from "./Socket";
import "../App.css";
import SalaEspera from "./SalaEspera";
const UnirsePartida=( { nombre } )=>{
  const [registrado, setRegistrado] = useState(false);
  const [codigoPartida, setCodPartida] = useState("");
  const [infoSalas, setinfoSalas] = useState("");
  const [verificar, setVerificacion] = useState("");

  /*useEffect(() => {
    socket.emit("Enviar salas", nombre);
  });

  useEffect(() => {
    socket.on("Recibir salas", salas => {
      setinfoSalas(salas);
    })
  });*/
  const refrescar=(e)=>{
    e.preventDefault();
    socket.emit("Enviar salas", nombre);
    socket.on("Recibir salas", salas => {
      setinfoSalas(salas);
    });
  }
  const registrar = (e) => {
    e.preventDefault();
    
    if (codigoPartida !== "") {
      socket.emit("Anadir jugador",nombre,codigoPartida);

      socket.on("Enviar verificasion",verificacion=>{
        setVerificacion(verificacion);
        if(verificacion==="2"){
          setRegistrado(true);
        }
      });
     
      
     
    }
  };

  /*socket.on("Recibir salas", salas => {
    setinfoSalas(salas);
  })*/

    return (
        <div className="login-container">
          {!registrado && (
            <form onSubmit={registrar}>
              <div className = 'title-container-label'>Eliga una partida</div>
              <textarea placeholder = {infoSalas} className = 'textarea-style' disabled
                name=""
                id=""
                cols="80"
                rows="20"
                //value={mensaje}
                //onChange={(e) => setMensaje(e.target.value)}
              ></textarea>
              <button onClick={refrescar} className='submit-button'>Refrescar</button>
              <input placeholder='Ingrese el codigo de una partida' className = 'input-style' value={codigoPartida} onChange={(e) => setCodPartida(e.target.value)} />
              <button onClick={registrar} className='submit-button'>Unirse a partida</button>
            </form>
          )}
          {registrado && <SalaEspera identificador={codigoPartida}/>}
        </div>
    );
}
export default UnirsePartida;
