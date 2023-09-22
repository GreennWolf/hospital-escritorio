import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export function DetallesFichas({fichas,usuarios,enfermedades,pacienteEnfermedad,areas,obrasSociales,socket}){
    const {id} = useParams()
    const [paciente , setPaciente] = useState([])
    const [obraSocial , setObraSocial] = useState([])
    const [personal , setPersonal] = useState([])
    const [area , setArea] = useState([])
    const [enfermedadesPaciente,setEnfermedadesPaciente] = useState([]) 


    useEffect(()=>{
        const pa = fichas.find(pa => pa.id == id)
        const os = obrasSociales.find(os => os.id == pa.idobra_social)
        const pe = usuarios.find(pe => pe.id == pa.idpersonal)
        const a = areas.find(a => a.id == pa.idarea)
        pacienteEnfermedad.map(ep =>{
            if(ep.idpaciente == id){
                const enfe = enfermedades.find(enfe => enfe.id == ep.idenfermedad)
                if(!enfermedadesPaciente.includes(enfe)){
                    enfermedadesPaciente.push(enfe)
                }
            }
        })
        setPaciente(pa)
        setObraSocial(os)
        setPersonal(pe)
        setArea(a)
        console.log(os,pa,pe,a)
    },[fichas,obrasSociales])

    return <main>
        <div className="formcont">
        <div className="title">
        <h1>{paciente?.nombre + ' ' + paciente?.apellido}</h1>
        </div>
        <div className="date">
        <h2>D.N.I</h2>
        <h3>{paciente?.dni}</h3>
        <h2>Telefono</h2>
        <h3>{paciente?.telefono}</h3>
        <h2>Email</h2>
        <h3>{paciente?.email}</h3>
        <h2>Fecha de Nacimiento</h2>
        <h3>{paciente?.nacimiento}</h3>
        <h2>Grupo y Factor Sanguineo</h2>
        <h3>{paciente?.grupo_sanguineo + ' ' + paciente?.factor_sanguineo}</h3>
        <h2>Obra Social y Carnet</h2>
        <h3>{obraSocial?.nombre + ':' + paciente?.carnet }</h3>
        <h2>Alergias</h2>
        <h3>{paciente?.alergias}</h3>
        <h2>Personal Acargo</h2>
        <h3>{personal?.nombre + ' ' + personal?.apellido}</h3>
        <h2>Area</h2>
        <h3>{area?.nombre}</h3>
        <h2>Enfermedades</h2>
        {
            enfermedadesPaciente.map(ep =>{
                return <h3>{ep?.nombre}</h3>
            })
        }
    </div>
    </div>
    </main>
}