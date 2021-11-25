import React from 'react';
import './assets/css/App.css';
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

import Login from './pages/login/Login';
import Juego from './pages/juego/Juego';
import CreateGame from './pages/juego/CreateGame';



function App() {
  return (

  
      <div className="App">
        <Login/>
      </div>
   
  )
}
/*<Login/> Anadirlo en el div de classneme=App*/
export default App;
