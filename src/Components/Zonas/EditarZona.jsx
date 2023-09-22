import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function EditarZona({zonas,socket}){

    const {id} = useParams()

    console.log('Zona editada' , id)

    const [nombre,setNombre] = useState()

    function handleSubmit(){
        var data = {
            id,
            nombre,
        }

        socket.emit('editZona',data)
        window.close()
        console.log('enviado')
    }

    useEffect(()=>{
        const zona = zonas.find(zona => zona.id == id)
        console.log(zonas,'xd')
        setNombre(zona?.nombre)
    },[zonas])


    return <main>
        <div className="formcont">
        <div className="title">
        <h1>Editar Zona</h1>
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