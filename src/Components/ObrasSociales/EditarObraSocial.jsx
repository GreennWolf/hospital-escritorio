import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function EditarObraSocial({obrasSociales,socket}){

    const {id} = useParams()

    console.log('Zona editada' , id)

    const [nombre,setNombre] = useState()

    function handleSubmit(){
        var data = {
            id,
            nombre,
        }

        socket.emit('editObraSocial',data)
        window.close()
        console.log('enviado')
    }

    useEffect(()=>{
        const obraSocial = obrasSociales.find(obraSocial => obraSocial.id == id)
        console.log(obrasSociales,'xd')
        setNombre(obraSocial?.nombre)
    },[obrasSociales])


    return <main>
        <div className="formcont">
        <div className="title">
        <h1>Editar Obra Social</h1>
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