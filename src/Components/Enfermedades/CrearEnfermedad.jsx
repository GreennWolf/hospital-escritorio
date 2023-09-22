import React, { useState } from "react";

export function CrearEnfermedad({enfermedades,socket}){

    const [nombre,setNombre] = useState()
    function handleSubmit(){
        var data = {
            nombre,
        }

        socket.emit('addEnfermedad',data)
        window.close()
        console.log('enviado')
    }

    return <main>
        <div className="formcont">
    <div className="title">
        <h1>Crear Enfermedad</h1>
    </div>
        <form onSubmit={(e)=>{
            e.preventDefault()
            handleSubmit()
        }}>
            <input type="text" placeholder="Nombre" required onChange={(e)=>{
                setNombre(e.target.value)
            }}/>
            <button>Crear</button>
        </form>
        </div>
    </main>
}