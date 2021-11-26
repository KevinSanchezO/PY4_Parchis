import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';
import './MenuInicio.css';
import './CrearPartida';
import './UnirsePartida';
import Title from "./Components/title/title";
import CrearPartida from "./CrearPartida";
import UnirsePartida from "./UnirsePartida";

const MenuInicio=()=>{
    const [crearpartida,setIsCrearPartida]=useState(false);
    const [unirsepartida,setIsUnirse]=useState(false);
    const [ranking,setIsRanking]=useState(false);

    function EventoCrearPartida(){
        setIsCrearPartida(true);
    }

    function EventoUnirse(){
        setIsUnirse(true);
    }

    function EventoRanking(){
        setIsRanking(true);
    }

    return(
        <div>{
                crearpartida? 
                        <Link exact to="/crearpartida">
                            <div>
                                <CrearPartida/>
                            </div>                    
                        </Link>
                :
                unirsepartida?
                    <Link exact to="/unirsepartida">
                        <div>
                            <UnirsePartida/>
                        </div>                    
                    </Link>
                :
        <div className="menuInicio-container">
          <div className='menuInicio-content'>
            <Title text='Bienvenido a Parchis'/>
            <div className='submit-container-button'>
                <button onClick={EventoCrearPartida} className='submit-button'>
                    Crear Partida
                </button>
                <button onClick={EventoUnirse} className='submit-button'>
                    Unirse a una partida
                </button>
                <button className='submit-button'>
                    Rankings
                </button>
            </div>
          </div>
        </div>
        }
        </div>
    )
};
export default MenuInicio;