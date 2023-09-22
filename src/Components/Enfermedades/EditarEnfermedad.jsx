import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function EditarEnfermedad({enfermedades,socket}){

    const {id} = useParams()

    const [nombre,setNombre] = useState()

    function handleSubmit(){
        var data = {
            id,
            nombre,
        }

        socket.emit('editArea',data)
        window.close()
        console.log('enviado')
    }

    useEffect(()=>{
        const enfermedad = enfermedades.find(enfermedad => enfermedad.id == id)
        console.log(enfermedades,'xd')
        setNombre(enfermedad?.nombre)
    },[enfermedades])


    return <main>
        <div className="formcont">
        <div className="title">
        <h1>Editar Enfermedad</h1>
        </div>
        <form action="" onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit()
            }}>
        <input type="text" placeholder="Nombre" defaultValue={nombre} required onChange={(e)=>{
                setNombre(e.target.value)
            }}/>
            <button>Editar</button>
        </form>
        </div>
    </main>
}