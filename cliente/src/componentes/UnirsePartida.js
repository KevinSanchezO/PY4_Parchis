import React, {useState,useEffect} from "react";
import socket from "./Socket";
import "../App.css";

const UnirsePartida=( { nombre } )=>{
  const [registrado, setRegistrado] = useState(false);
  const [codigoPartida, setCodPartida] = useState("");
    
  useEffect(() => {
    socket.emit("prueba", "es solo una prueba");
  })

  const registrar = (e) => {
    e.preventDefault();
    if (codigoPartida !== "") {
      setRegistrado(true);
    }
  };

    return (
        <div className="login-container">
          {!registrado && (
            <form onSubmit={registrar}>
              <div className = 'title-container-label'>Eliga una partida</div>
              <textarea className = 'textarea-style' disabled
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
