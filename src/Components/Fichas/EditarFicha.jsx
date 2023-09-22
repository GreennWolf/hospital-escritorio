import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function EditarFicha({fichas,usuarios,areas,obrasSociales,pacienteEnfermedad,enfermedades,cargos,socket}){

    const {id} = useParams()
    console.log(fichas)
    const [nombre,setNombre] = useState()
    const [apellido,setApellido] = useState()
    const [dni,setDni] = useState()
    const [telefono,setTelefono] = useState()
    const [email,setEmail] = useState()
    const [nacimiento,setNacimiento] = useState()
    const [grupoSanguineo,setGrupoSanguineo] = useState()
    const [factor,setFactor] = useState()
    const [obraSocial,setObraSocial] = useState()
    const [carnet,setCarnet] = useState()
    const [alergias,setAlergias] = useState()
    const [personal,setPersonal] = useState()
    const [area,setArea] = useState()
    const [enfeSelected,setEnfeSelected] = useState([])
    const [enfeDeselected , setEnfeDeselected] = useState([])

    function handleSubmit(){
        var data = {
            id,
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
        console.log(enfeSelected)

        socket.emit('editPaciente',data)
        window.close()
        console.log('enviado')

        enfeDeselected.map(idE =>{
            console.log(idE,id,'desel')
            console.log(idE,'deselected')
            const pa = pacienteEnfermedad.find(pa => pa.idenfermedad == idE && pa.idpaciente == id)
            if(pa != undefined){
                socket.emit('deletePacienteEnfermedad',pa.id)
                console.log('ready deleted')
                window.close()
            }else{
                console.log(pa,'pa')
            }
        })
    }

    function transformarFechaYAsignar(fechaOriginal) {
        // Crear un objeto de fecha a partir de la cadena original
        const fecha = new Date(fechaOriginal);
      
        // Obtener componentes de fecha (año, mes y día)
        const año = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11
        const dia = fecha.getDate().toString().padStart(2, '0');
      
        // Formatear la fecha en el formato válido para el input date
        const fechaFormateada = `${año}-${mes}-${dia}`;
        setNacimiento(fechaFormateada)
      }

    useEffect(()=>{
        const paciente = fichas.find(paciente => paciente.id == id)
        console.log(paciente,id,fichas)
        setNombre(paciente?.nombre)
        setApellido(paciente?.apellido)
        setDni(paciente?.dni)
        setEmail(paciente?.email)
        setTelefono(paciente?.telefono)
        transformarFechaYAsignar(paciente?.nacimiento)
        setGrupoSanguineo(paciente?.grupo_sanguineo)
        setFactor(paciente?.factor_sanguineo)
        setObraSocial(paciente?.idobra_social)
        setCarnet(paciente?.carnet)
        setAlergias(paciente?.alergias)
        setPersonal(paciente?.idpersonal)
        setArea(paciente?.idarea)
    },[fichas])

    return <main>
    <div className="formcont">
    <div className="title">
        <h1>Editar ficha</h1>
    </div>
        <form onSubmit={(e)=>{
            e.preventDefault()
            handleSubmit()
        }}>
            <input type="text" placeholder="Nombre" defaultValue={nombre}  required onChange={(e)=>{
                setNombre(e.target.value)
            }}/>
            <input type="text" placeholder="Apellido" defaultValue={apellido}   required onChange={(e)=>{
                setApellido(e.target.value)
            }}/>
            <input type="number" placeholder="D.N.i" defaultValue={dni}  required onChange={(e)=>{
                setDni(e.target.value)
            }}/>
            <input type="number" placeholder="Telefono" defaultValue={telefono}  required onChange={(e)=>{
                setTelefono(e.target.value)
           }}/>
            <input type="email" placeholder="Correo Electronico" defaultValue={email} required onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            <input type="date" required defaultValue={nacimiento}  onChange={(e)=>{
                setNacimiento(e.target.value)
            }}/>
            <select name="grupoSanguineo" id="grupoSanguineo" defaultValue={grupoSanguineo}  onChange={(e)=>{
                setGrupoSanguineo(e.target.value)
            }}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="B">AB</option>
                <option value="0">0</option>
            </select>
            <select name="factor" id="factor" defaultValue={factor}  onChange={(e)=>{
                setFactor(e.target.value)
            }}>
                <option value="+">+</option>
                <option value="-">-</option>
            </select>
            <select name="obraSocial" id="" defaultValue={obraSocial}  onChange={(e)=>{
                setObraSocial(e.target.value)
            }}>
                {
                    obrasSociales.map(obraSocial =>{
                        return <option value={obraSocial.id}>{obraSocial.nombre}</option>
                    })
                }
            </select>
            <input type="text" placeholder="Carnet" defaultValue={carnet}  required onChange={(e)=>{
                setCarnet(e.target.value)
            }}/>
            <textarea placeholder="Alergias" style={{resize:"none",height:100,}} defaultValue={alergias}  required onChange={(e)=>{
                setAlergias(e.target.value)
            }}/>
            <select name="personal" id="" defaultValue={personal}  onChange={(e)=>{
                setPersonal(e.target.value)
            }}>
                {usuarios.map(personal =>{
                    if(personal.idcargo == 3){
                        return <option value={personal.id}>{personal.nombre+ ' ' + personal.apellido}</option>
                    }
                })}
            </select> 
            <select name="area" id=""  defaultValue={area} onChange={(e)=>{
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
                            const enfe = pacienteEnfermedad.find(enfe => enfe.idpaciente == id && enfe.idenfermedad == enfermedad.id)
                            const check = enfe != undefined ? true : false
                            console.log(check)
                            return <tr key={enfermedad.id}>
                                <td>{enfermedad.nombre}</td>
                                <td><input type="checkbox" name="enfermedad" id="enfermedad" defaultChecked={check}  onChange={(e)=>{
                                    if (e.target.checked) {
                                        if(check == true && enfeDeselected.includes(enfermedad.id)){
                                            setEnfeDeselected(enfeDeselected.filter((id) => id !== enfermedad.id));
                                        }else{
                                            setEnfeSelected([...enfeSelected, enfermedad.id]);
                                            console.log(enfeSelected,'true')
                                        }
                                    } else {
                                        console.log(enfeSelected,'dalse')
                                        if(check == true){
                                            enfeDeselected.push(enfermedad.id)
                                        }
                                        // Checkbox desmarcado, eliminar user.id de enfeSelected
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
        
            <button>Editar</button>
        </form>
    </div>
    </main>
}