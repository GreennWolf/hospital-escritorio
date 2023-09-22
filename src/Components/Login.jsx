import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/Img/Logo.png";
import '../Style/Login.css'

export function Login({usuarios , socket}){

    const [email , setEmail] = useState()
    const [password,setPassword] = useState()
    const nav = useNavigate()

    function Comprobar(){
        const usuario = usuarios.find(usuario => usuario.email.toLowerCase() == email.toLowerCase());
        if(usuario && usuario.password == password && usuario.admin == 1){
            nav(`/menu/${usuario.id}`)
            console.log('econtrado')
        }else{
            console.log('usuario no encontrado')
        }

        if(usuario && usuario.password == password && usuario.alarma == 1){
            nav(`/alarmaAzul/`)
            console.log('econtrado')
        }else{
            console.log('usuario no encontrado')
        }
    }

    return <main className="container">
        <div className="deco">
            <div className="block"></div>
        </div>
        <div className="box">
        <img src={Logo} alt=""/>
        <h1>Iniciar Sesión</h1>
        <form>
            <input type="text" placeholder="Usuario/Email" onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            <input type="password" placeholder="Contraseña" onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
            <button onClick={(e)=>{
                e.preventDefault()
                Comprobar()
            }}>Iniciar</button>
        </form>
        </div>
    </main>
}