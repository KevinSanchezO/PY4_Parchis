import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';
import './Login.css';
import Title from "./Components/title/title";
import Label from "./Components/label/label";
import Input from "./Components/input/input";
import CreateGame from './CreateGame';
const Login=()=> {
    const [user,setUser]= useState('');
    const [isLogin,setIsLogin ]=useState(false);
    const [hasError,setHasError]=useState(false);

    function handleChange (name,value){
        if (name==='jugador'){
         setUser(value);
         setHasError(false);
        }else{
            setHasError(false);
        }
    };

    function ifMatch(param){
        if(param.user.length>0){
            let ac={user};
            let account= JSON.stringify(ac);
            localStorage.setItem('account',account);
            setIsLogin(true);
        }else{
            setIsLogin(false);
            setHasError(true);

        }
    }
    function handleSubmit(){
        let account={ user }
        if(account){
            ifMatch(account);
            console.log('account: ',account)
        }
    }

    console.log('jugador:',user)
    
    return(
            <div>
                {isLogin ? 
               
                    <Router>
      
                        
                                <Link to="/crear">
                                    <div className='container'>
                                         <CreateGame/>
                                    </div>
                                    
                                </Link>
               
    
                    </Router>

            :
            <div className='login-container'>
            <div className='login-content'>  
                <Title text='Bienvenido, Juguemos!!'/>
                <Label text='Nombre del jugador'/>
                <Input
                attribute={{
                    id: 'jugador',
                    name: 'jugador',
                    type: 'text',
                    placeholder:'Ingrese su nickname'
                }}
                handleChange={handleChange}
                />
                {hasError &&
                    <label className='label-alert'>
                        Primero ingrese un nickname antes de continuar!

                    </label>
                }
                <div className='submit-container-button'>
                    <button onClick={handleSubmit} className='submit-button'>
                        Ingresar
                    </button>

                </div>
            </div>
            </div> 
            }  
        </div>
        
    )
};
export default Login;