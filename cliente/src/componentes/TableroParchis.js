/* source code: https://codepen.io/Bunno/pen/EOqjpV 
Estructura del tablero*/
import React, { useState,useEffect } from "react";
import '../App.css'
import socket from "./Socket";

//seccion de juego con el tablero del parchis
const TableroParchis =( { identificador } )=>{
    const [jugadores, setJugadores] = useState([]);
    const [cantidaSala, setCantSala] = useState("");

    //llamada al socket
    useEffect(() => {
        socket.emit("Enviar players", identificador);
    });
    
    //llamada al socket para recibir los jugadores del juego
    useEffect(() => {
        socket.on("Recibir players", jugadores => {
          setJugadores(jugadores);
        })
    });

    //llamada al socket
    useEffect(() => {
        socket.emit("Enviar players cant", identificador);
    });

    //llamada al socket para recibir la cantidad maxima de jugadores
    useEffect(() => {
        socket.on("Recibir players cant", cant => {
          setCantSala(cant);
        })
    });

    //creacion de un string con la cantidad maxima de jugadores
    function stringCantPlayers () {
        return "Cantidad: "+cantidaSala;
    }

    //creacion de un string con el nombre del jugador 1
    function stringJ1 (){
        return "Jugador 1. "+ jugadores[0];
    }

    //creacion de un string con el nombre del jugador 2
    function stringJ2 (){
        return "Jugador 2. "+ jugadores[1];
    }

    //creacion de un string con el nombre del jugador 3
    function stringJ3 (){
        return "Jugador 3. "+ jugadores[2];
    }

    //creacion de un string con el nombre del jugador 4
    function stringJ4 (){
        return "Jugador 4. "+ jugadores[3];
    }

    return (
        <div>
            <h1>{identificador}</h1>
            <h4>{stringCantPlayers()}</h4>
            <h4 class = "playerRojo">{stringJ1()}</h4>
            <h4 class = "playerVerde">{stringJ2()}</h4>
            <h4 class = "playerAmarillo">{stringJ3()}</h4>
            <h4 class = "playerAzul">{stringJ4()}</h4>
            <table border="1px">
                <tr>
                <td class="amarillo" colspan="7" rowspan="7"></td>
                <td colspan="2"><button class="blanco">1</button></td>
                <td colspan="2"><button class="blanco">68</button></td>
                <td colspan="2"><button class="blanco">67</button></td>
                <td class="verde" colspan="7" rowspan="7"></td>
                </tr>

                <tr>
                <td colspan="2"><button class="blanco">2</button></td>
                <td class="amarillo" colspan="2">-</td>
                <td colspan="2"><button class="blanco">66</button></td>
                </tr>

                <tr>
                <td colspan="2"><button class="blanco">3</button></td>
                <td class="amarillo" colspan="2">-</td>
                <td colspan="2"><button class="blanco">65</button></td>
                </tr>

                <tr>
                <td colspan="2"><button class="blanco">4</button></td>
                <td class="amarillo" colspan="2">-</td>
                <td colspan="2"><button class="blanco">64</button></td>
                </tr>

                <tr>
                <td class="amarillo" colspan="2"><button class="amarillo">5</button></td>
                <td class="amarillo" colspan="2">-</td>
                <td colspan="2"><button class="blanco">63</button></td>
                </tr>

                <tr>
                <td colspan="2"><button class="blanco">6</button></td>
                <td class="amarillo" colspan="2">-</td>
                <td colspan="2"><button class="blanco">62</button></td>
                </tr>

                <tr>
                <td colspan="2"><button class="blanco">7</button></td>
                <td class="amarillo" colspan="2">-</td>
                <td colspan="2"><button class="blanco">61</button></td>
                </tr>


                <tr>
                <td rowspan="2"><button class="blanco">16</button></td>
                <td rowspan="2"><button class="blanco">15</button></td>
                <td rowspan="2"><button class="blanco">14</button></td>
                <td rowspan="2"><button class="blanco">13</button></td>
                <td rowspan="2"><button class="blanco">12</button></td>
                <td rowspan="2"><button class="blanco">11</button></td>
                <td rowspan="2"><button class="blanco">10</button></td>
                <td id="vacio"></td>
                <td><button class="blanco">8</button></td>
                <td>-</td>
                <td>-</td>
                <td><button class="blanco">60</button></td>
                <td id="vacio"></td>
                <td rowspan="2"><button class="blanco">58</button></td>
                <td rowspan="2"><button class="blanco">57</button></td>
                <td class="verde" rowspan="2"><button class="verde">56</button></td>
                <td rowspan="2"><button class="blanco">55</button></td>
                <td rowspan="2"><button class="blanco">54</button></td>
                <td rowspan="2"><button class="blanco">53</button></td>
                <td rowspan="2"><button class="blanco">52</button></td>
                </tr>

                <tr>
                <td><button class="blanco">9</button></td>
                <td colspan="4" rowspan="4"><img src="http://ilusionesopticas.org.es/wp-content/uploads/2015/10/movimiento-de-centro-hacia-afuera-400x400.jpg" alt="centro" /></td>
                <td><button class="blanco">59</button></td>
                </tr>

                <tr>
                <td rowspan="2"><button class="blanco">17</button></td>
                <td class="azul" rowspan="2">|</td>
                <td class="azul" rowspan="2">|</td>
                <td class="azul" rowspan="2">|</td>
                <td class="azul" rowspan="2">|</td>
                <td class="azul" rowspan="2">|</td>
                <td class="azul" rowspan="2">|</td>
                <td>|</td>
                <td>|</td>
                <td class="verde" rowspan="2">|</td>
                <td class="verde" rowspan="2">|</td>
                <td class="verde" rowspan="2">|</td>
                <td class="verde" rowspan="2">|</td>
                <td class="verde" rowspan="2">|</td>
                <td class="verde" rowspan="2">|</td>
                <td rowspan="2"><button class="blanco">51</button></td>
                </tr>

                <tr>
                <td>|</td>
                <td>|</td>
                </tr>

                <tr>
                <td rowspan="2"><button class="blanco">18</button></td>
                <td rowspan="2"><button class="blanco">19</button></td>
                <td rowspan="2"><button class="blanco">20</button></td>
                <td rowspan="2"><button class="blanco">21</button></td>
                <td class="azul" rowspan="2"><button class="azul">22</button></td>
                <td rowspan="2"><button class="blanco">23</button></td>
                <td rowspan="2"><button class="blanco">24</button></td>
                <td><button class="blanco">25</button></td>
                <td><button class="blanco">43</button></td>
                <td rowspan="2"><button class="blanco">44</button></td>
                <td rowspan="2"><button class="blanco">45</button></td>
                <td rowspan="2"><button class="blanco">46</button></td>
                <td rowspan="2"><button class="blanco">47</button></td>
                <td rowspan="2"><button class="blanco">48</button></td>
                <td rowspan="2"><button class="blanco">49</button></td>
                <td rowspan="2"><button class="blanco">50</button></td>
                </tr>

                <tr>
                <td id="vacio"></td>
                <td><button class="blanco">26</button></td>
                <td>-</td>
                <td>-</td>
                <td><button class="blanco">42</button></td>
                <td id="vacio"></td>
                </tr>

                <tr>
                <td class="azul" colspan="7" rowspan="7"></td>
                <td colspan="2"><button class="blanco">27</button></td>
                <td class="rojo" colspan="2">-</td>
                <td colspan="2"><button class="blanco">41</button></td>
                <td class="rojo" colspan="7" rowspan="7"></td>
                </tr>

                <tr>
                <td colspan="2"><button class="blanco">28</button></td>
                <td class="rojo" colspan="2">-</td>
                <td colspan="2"><button class="blanco">40</button></td>
                </tr>

                <tr>
                <td colspan="2"><button class="blanco">29</button></td>
                <td class="rojo" colspan="2">-</td>
                <td class="rojo" colspan="2"><button class="rojo">39</button></td>
                </tr>

                <tr>
                <td colspan="2"><button class="blanco">30</button></td>
                <td class="rojo" colspan="2">-</td>
                <td colspan="2"><button class="blanco">38</button></td>
                </tr>

                <tr>
                <td colspan="2"><button class="blanco">31</button></td>
                <td class="rojo" colspan="2">-</td>
                <td colspan="2"><button class="blanco">37</button></td>
                </tr>

                <tr>
                <td colspan="2"><button class="blanco">32</button></td>
                <td class="rojo" colspan="2">-</td>
                <td colspan="2"><button class="blanco">36</button></td>
                </tr>

                <tr>
                <td colspan="2"><button class="blanco">33</button></td>
                <td colspan="2"><button class="blanco">34</button></td>
                <td colspan="2"><button class="blanco">35</button></td>
                </tr>
        </table>
    </div>
    )
}
export default TableroParchis;