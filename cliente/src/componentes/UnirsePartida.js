import React, {useState,useEffect} from "react";
import socket from "./Socket";
import "../App.css";

const UnirsePartida=( { nombre } )=>{
  const [registrado, setRegistrado] = useState(false);
  const [codigoPartida, setCodPartida] = useState("");
  const [infoSalas, setinfoSalas] = useState("");

  useEffect(() => {
    socket.emit("Enviar salas", nombre);
  });

  useEffect(() => {
    socket.on("Recibir salas", salas => {
      setinfoSalas(salas);
    })
  });

  const registrar = (e) => {
    e.preventDefault();
    if (codigoPartida !== "") {
      setRegistrado(true);
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
              <input placeholder='Ingrese el codigo de una partida' className = 'input-style' value={codigoPartida} onChange={(e) => setCodPartida(e.target.value)} />
              <button className='submit-button'>Unirse a partida</button>
            </form>
          )}
        </div>
    );
}
export default UnirsePartida;
