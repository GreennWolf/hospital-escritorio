import React, { useState } from "react";

export function CrearUsuario({cargos,socket}){

    const [nombre,setNombre] = useState()
    const [apellido,setApellido] = useState()
    const [password,setPassword] = useState()
    const [telefono,setTelefono] = useState()
    const [email,setEmail] = useState()
    const [dni,setDni] = useState()
    const [cargo,setCargo] = useState(1)
    const [admin,setAdmin] = useState(false)
 
    function handleSubmit(){
        var data = {
            nombre,
            apellido,
            password,
            email,
            telefono,
            dni,
            cargo,
            admin
        }

        socket.emit('addUsuario',data)
        console.log(apellido,data.apellido)
        window.close()
        console.log('enviado')
    }

    return <main>
        <div className="formcont">
        <div className="title">
        <h1>Crear Usuario</h1>
        </div>
        <form onSubmit={(e)=>{
            e.preventDefault()
            handleSubmit()
        }}>
            <input type="text" placeholder="Nombre" required onChange={(e)=>{
                setNombre(e.target.value)
            }}/>
            <input type="text" placeholder="Apellido"  required onChange={(e)=>{
                setApellido(e.target.value)
            }}/>
            <input type="password" placeholder="Contraseña" required onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
            <input type="email" placeholder="Correo Electronico"required onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            <input type="number" placeholder="Telefono" required onChange={(e)=>{
                setTelefono(e.target.value)
            }}/>
            <input type="number" placeholder="D.N.I" required onChange={(e)=>{
                setDni(e.target.value)
            }}/>
            <select name="cargos" id="cargos"required onChange={(e)=>{
                setCargo(e.target.value)
            }}>
                {
                    cargos.map(cargo =>{
                        return <option value={cargo.id}>{cargo.nombre}</option>
                    })
                }
            </select>
            <input type="checkbox" name="admin" id="admin" onChange={()=>{
                setAdmin(!admin)
            }} />
            <button>Crear</button>
        </form>
        </div>
    </main>
}