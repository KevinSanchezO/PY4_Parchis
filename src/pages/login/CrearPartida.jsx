import React, {useState} from "react";
import './CrearPartida.css';
import Title from "./Components/title/title";
import Label from "./Components/label/label";
import Input from "./Components/input/input";
const CrearPartida=()=>{
    const [user,setUserNick]= useState('');
    const [cantidad,setCantidad]= useState('');

    const [isLogin,setIsLogin ]=useState(false);
    const [hasErrorNick,setHasErrorNick]=useState(false);
    const [hasErrorCantidad,setHasErrorCantidad]=useState(false);
    const [hasErrorCantidadMinMax,setHasErrorCantidadMinMax]=useState(false);

    function ifMatch(param,param2){

        if(param.user.length>0 && param2.cantidad.length>0){
            if(param2.cantidad ==='2' || param2.cantidad==='4'){
                let ac={user};
                let ap={cantidad};
                let account= JSON.stringify(ac);
                localStorage.setItem('Nickname',account);
                let account2= JSON.stringify(ap);
                localStorage.setItem('Cantidad',account2);
                setIsLogin(true);

            }else{
                setHasErrorCantidadMinMax(true);
                setIsLogin(false);
            }
            
        }else{
            if(param.user.length<1){
                setHasErrorNick(true);
                setIsLogin(false);
            }else{
                setHasErrorCantidadMinMax(true);
                setIsLogin(false);
            }
           
           

        }
    }
    function handleSubmit(){
        let account={ user }
        let account2={cantidad}
        if(account && account2){
            ifMatch(account, account2);
            console.log('account: ',account);
            console.log('account: ',account2);
        }
    }

    console.log('jugador:',user)

    function handleChange (name,value){
        if (name==='Nick'){
            setUserNick(value);
            setHasErrorNick(false);
        }else{
            if(name==='CantidadJugadores'){
                setCantidad(value);
                setHasErrorCantidad(false);
            }else{
                setHasErrorNick(false);   
                setHasErrorCantidad(false);
            }
        }
    };
    
    return(
        <div>
            {isLogin ? 
                <div className="container"> 
                    <Label text='Funca'/>
                </div>
                /* <Router>
      
                            
                    <Link to="/crear">
                        <div className='container'>
                            <CreateGame/>
                        </div>
                        
                    </Link>


                </Router>*/
            :
            <div className="crearPartida-container">
              <div className='crearPartida-content'>
                <Title text='Creemos una partida!!'/>
                <Label text='Nickname del jugador'/>
                <Input
                    attribute={{
                        id: 'Nick',
                        name: 'Nick',
                        type: 'text',
                        placeholder:'Ingrese su nickname'
                    }}
                    handleChange={handleChange}
                    />
                    {hasErrorNick &&
                        <label className='label-alert'>
                            Primero ingrese un nickname antes de continuar!

                        </label>
                    }
                <Label text='Cantidad de jugadores'/>
                <Input
                    attribute={{
                        id: 'CantidadJugadores',
                        name: 'CantidadJugadores',
                        type: 'text',
                        placeholder:'Indique la cantidad'
                    }}
                    handleChange={handleChange}
                    />
                    {hasErrorCantidad &&
                        <label className='label-alert'>
                            Primero ingrese la cantidad de jugadores antes de continuar!

                        </label>
                    }
                    {hasErrorCantidadMinMax &&
                        <label className='label-alert'>
                            La cantidad de jugadores debe ser 2 o 4!

                        </label>
                    }
                    <div className='submit-container-button'>
                        <button onClick={handleSubmit} className='submit-button'>
                            Arrancar!!
                        </button>

                    </div>


                </div>
            </div>
            }
        </div>

    )
};
export default CrearPartida;
