import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

import Login from './pages/login/Login';

function App() {
  return (
      <div className="App">
        <Login/>
      </div>
  )
}
/*<Login/> Anadirlo en el div de classneme=App*/
export default App;
