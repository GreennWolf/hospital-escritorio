import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function PantallaAlarma({socket,areas}){

    const {idarea} = useParams()
    const [area,setArea] = useState([])

    function convertirTextoAVoz(texto) {
        const synthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(texto);
      
        // Configura las propiedades de la voz (opcional)
        utterance.voice = synthesis.getVoices()[0]; // Puedes seleccionar una voz específica aquí
        utterance.rate = 1.0; // Velocidad de reproducción (1.0 es la velocidad normal)
      
        // Reproduce el texto en voz
        synthesis.speak(utterance);
    }
    
    useEffect(()=>{
        // const a = areas.find(a => a.id == idarea)
        // setArea(a)
        convertirTextoAVoz('ATENCION ALARMA AZUL EN EL AREA ' + idarea)
        // console.log(area?.nombre)
        setInterval(() => {
            convertirTextoAVoz('ATENCION ALARMA AZUL EN EL AREA ' + idarea)
        }, 500);
    },[areas,idarea])



    return <main>
        <div className="alarm">
        <h1>ATENCIÓN</h1>
        <h1>{idarea}</h1>
        </div>
    </main>
      
}