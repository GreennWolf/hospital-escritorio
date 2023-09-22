import React, { useState } from "react";

export function CrearCargo({cargos,socket}){

    const [nombre,setNombre] = useState()
 
    function handleSubmit(){
        var data = {
            nombre,
        }

        socket.emit('addCargo',data)
        window.close()
        console.log('enviado')
    }

    return <main>
        <div className="formcont">
        <div className="title">
        <h1>Crear Cargo</h1>
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