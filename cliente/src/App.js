import React, { useState } from "react";
import "./App.css";
import MenuInicio from "./componentes/MenuInicio";

function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <div className="login-container">
      {!registrado && (
        <form onSubmit={registrar}>
          <div className = 'title-container-label'>Bienvenido a Parchis</div>
          <input placeholder='Ingrese un nickname' className = 'input-style' value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <button className='submit-button'>Log in</button>
        </form>
      )}
      {registrado && <MenuInicio nombre={nombre} />}
    </div>
  );
}

export default App;
