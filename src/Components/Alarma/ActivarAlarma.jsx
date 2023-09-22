import React from "react";


export function ActivarAlarma({areas,socket}){
    return <main>
        <div className="tab">
        <div className="title">
        <h1>Alarma Azul</h1>
        </div>
        <div className="cont">
        <h3>Seleccione el Area de emergencia</h3>
        <div className="alarmaAreasContainer">
        {
            areas.map(area =>{
                return <div className="alarmaAreaBtn" onClick={()=>{
                    socket.emit('alarmaAzul',area.nombre)
                }}>{area.nombre}</div>
            })
        }
        </div>
        </div>
        </div>
    </main>
}