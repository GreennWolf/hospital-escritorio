import React, { useEffect, useState } from "react";

export function CrearFicha({fichas,usuarios,areas,obrasSociales,enfermedades,cargos,socket}){

    const [nombre,setNombre] = useState()
    const [apellido,setApellido] = useState()
    const [dni,setDni] = useState()
    const [telefono,setTelefono] = useState()
    const [email,setEmail] = useState()
    const [nacimiento,setNacimiento] = useState()
    const [grupoSanguineo,setGrupoSanguineo] = useState('A')
    const [factor,setFactor] = useState('+')
    const [obraSocial,setObraSocial] = useState(1)
    const [carnet,setCarnet] = useState()
    const [alergias,setAlergias] = useState()
    
    const [personal,setPersonal] = useState()
    const [area,setArea] = useState()
    const [enfeSelected,setEnfeSelected] = useState([])

    useEffect(()=>{
        const per = usuarios.find(per => per.idcargo == 3)
        setPersonal(per?.id)
        setArea(areas[0]?.id)
    },[usuarios])

    function handleSubmit(){

        if(area == undefined){
            setArea()
        }

        var data = {
            nombre,
            apellido,
            dni,
            email,
            telefono,
            nacimiento,
            grupoSanguineo,
            factor,
            obraSocial,
            carnet,
            alergias,
            personal,
            area,
            enfermedades:enfeSelected
        }
        console.log(data)
        socket.emit('addPaciente',data)

        
        // window.close()
        console.log('enviado')
    }

    return <main>
        <div className="formcont">
        <div className="title">
        <h1>Crear ficha</h1>
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
            <input type="number" placeholder="D.N.i" required onChange={(e)=>{
                setDni(e.target.value)
            }}/>
            <input type="number" placeholder="Telefono" required onChange={(e)=>{
                setTelefono(e.target.value)
           }}/>
            <input type="email" placeholder="Correo Electronico"required onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            <input type="date" required onChange={(e)=>{
                setNacimiento(e.target.value)
            }}/>
            <select name="grupoSanguineo" id="grupoSanguineo" onChange={(e)=>{
                setGrupoSanguineo(e.target.value)
            }}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="B">AB</option>
                <option value="0">0</option>
            </select>
            <select name="factor" id="factor" onChange={(e)=>{
                setFactor(e.target.value)
            }}>
                <option value="+">+</option>
                <option value="-">-</option>
            </select>
            <select name="obraSocial" id="" onChange={(e)=>{
                setObraSocial(e.target.value)
            }}>
                {
                    obrasSociales.map(obraSocial =>{
                        return <option value={obraSocial.id}>{obraSocial.nombre}</option>
                    })
                }
            </select>
            <input type="text" placeholder="Carnet" required onChange={(e)=>{
                setCarnet(e.target.value)
            }}/>
            <input type="text" placeholder="Alergias" required onChange={(e)=>{
                setAlergias(e.target.value)
            }}/>
            <select name="personal" id="" onChange={(e)=>{
                setPersonal(e.target.value)
            }}>
                {usuarios.map(personal =>{
                    if(personal.idcargo == 3){
                        return <option value={personal.id}>{personal.nombre+ ' ' + personal.apellido}</option>
                    }
                })}
            </select> 
            <select name="area" id="" onChange={(e)=>{
                setArea(e.target.value)
            }}>
                {
                    areas.map(a =>{
                        return <option value={a.id}>{a.nombre}</option>
                    })
                }
            </select> 
            <table>
                        <thead>
                            <tr>
                                <th>Enfermedad</th>
                                <th>La tiene?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                enfermedades.map(enfermedad =>{
                                    return <tr>
                                        <td>{enfermedad.nombre}</td>
                                        <td><input type="checkbox" name="enfermedad" id="enfermedad"  onChange={(e)=>{
                                            if (e.target.checked) {
                                                setEnfeSelected([...enfeSelected, enfermedad.id]);
                                            } else {
                                                if(enfeSelected.includes(enfermedad.id)){
                                                    setEnfeSelected(enfeSelected.filter((id) => id !== enfermedad.id));
                                                }
                                            }
                                        }}/></td>
                                    </tr>
                                })
                                
                            }
                            
                        </tbody>
                    </table>        
            <button>Crear</button>
        </form>
        </div>
    </main>
}