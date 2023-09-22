import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function EditarTipo({tipos,socket}){

    const {id} = useParams()

    console.log('Tipo editada' , id)

    const [nombre,setNombre] = useState()

    function handleSubmit(){
        var data = {
            id,
            nombre,
        }

        socket.emit('editTipo',data)
        window.close()
        console.log('enviado')
    }

    useEffect(()=>{
        const tipo = tipos.find(tipo => tipo.id == id)
        console.log(tipos,'xd')
        setNombre(tipo?.nombre)
    },[tipos])


    return <main>
        <div className="formcont">
        <div className="title">
        <h1>Editar Tipo</h1>
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