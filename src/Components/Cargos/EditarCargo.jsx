import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function EditarCargo({cargos,socket}){

    const {id} = useParams()

    console.log('cargo editada' , id)

    const [nombre,setNombre] = useState()

    function handleSubmit(){
        var data = {
            id,
            nombre,
        }

        socket.emit('editCargo',data)
        window.close()
        console.log('enviado')
    }

    useEffect(()=>{
        const cargo = cargos.find(cargo => cargo.id == id)
        console.log(cargos,'xd')
        setNombre(cargo?.nombre)
    },[cargos])


    return <main>
        <div className="formcont">
        <div className="title">
        <h1>Editar Cargo</h1>
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