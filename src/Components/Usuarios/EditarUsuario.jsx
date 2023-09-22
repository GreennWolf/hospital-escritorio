import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function EditarUsuario({cargos,usuarios,socket}){

    const {id} = useParams()

    console.log('cuenta editada' , id)

    const [nombre,setNombre] = useState()
    const [apellido,setApellido] = useState()
    const [password,setPassword] = useState()
    const [telefono,setTelefono] = useState()
    const [email,setEmail] = useState()
    const [dni,setDni] = useState()
    const [cargo,setCargo] = useState(1)
    const [admin,setAdmin] = useState()

    function handleSubmit(){
        var data = {
            id,
            nombre,
            apellido,
            password,
            email,
            telefono,
            dni,
            cargo,
            admin,
        }

        socket.emit('editUsuario',data)
        window.close()
        console.log('enviado')
    }

    useEffect(()=>{
        const usuario = usuarios.find(usuario => usuario.id == id)
        console.log(usuarios,'xd')
        setNombre(usuario?.nombre)
        setApellido(usuario?.apellido)
        setPassword(usuario?.password)
        setEmail(usuario?.email)
        setTelefono(usuario?.telefono)
        setDni(usuario?.dni)
        setCargo(usuario?.idcargo)
        console.log(usuario?.admin)
        if(usuario?.admin != 0){
            setAdmin(true)
        }else{
            setAdmin(false)
        }
    },[usuarios])


    return <main>
    <div className="formcont">
        <div className="title">
        <h1>Editar Usuario</h1>
        </div>
        <form action="">
        <input type="text" placeholder="Nombre" defaultValue={nombre}  onChange={(e)=>{
                setNombre(e.target.value)
            }}/>
            <input type="text" placeholder="Apellido" defaultValue={apellido} onChange={(e)=>{
                setApellido(e.target.value)
            }}/>
            <input type="password" placeholder="Contraseña" defaultValue={password}  onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
            <input type="email" placeholder="Correo Electronico" defaultValue={email}  onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            <input type="number" placeholder="Telefono" defaultValue={telefono}  onChange={(e)=>{
                setTelefono(e.target.value)
            }}/>
            <input type="number" placeholder="D.N.I" value={dni}  onChange={(e)=>{
                setDni(e.target.value)
            }}/>
            <select name="cargos" id="cargos" value={cargo} onChange={(e)=>{
                setCargo(e.target.value)
            }}>
                {
                    cargos.map(cargo =>{
                        return <option value={cargo.id}>{cargo.nombre}</option>
                    })
                }
            </select>
            <input type="checkbox" name="admin" id="admin" defaultChecked={admin} onChange={()=>{
                setAdmin(!admin)
            }} />
            <button onClick={(e)=>{
                e.preventDefault()
                handleSubmit()
            }}>Editar</button>
        </form>
    </div>
    </main>
}