import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';
import './UnirsePartida.css';
import Title from "./Components/title/title";


const UnirsePartida=()=>{
    return(
        <div>
            <div className="unirsePartida-container">
                <div className='unirsePartida-content'>
                    <Title text='Seleccione una partida a unirse'/>
                </div>
            </div>
        </div>
    )
};
export default UnirsePartida;
