import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function EditarArea({areas,socket}){

    const {id} = useParams()

    console.log('Area editada' , id)

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
        const area = areas.find(area => area.id == id)
        console.log(areas,'xd')
        setNombre(area?.nombre)
    },[areas])


    return <main>
    <div className="formcont">
    <div className="title">
        <h1>Editar Area</h1>
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