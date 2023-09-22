import React, { useState } from "react";
import config from '../../Config/settings.json'

export function Configuracion(){
    const [ip,setIp] = useState()
    const [puerto,setPuerto] = useState()
    return (
        <div className="tab">
          <h1>Configuracion</h1>
          <input type="text" name="" id="" placeholder="ip" defaultValue={config[0].ip}  onChange={(e)=>{
            setIp(e.target.value)
          }}/>
          <input type="text" name="" id="" placeholder="puerto" defaultValue={config[0].puerto}  onChange={(e)=>{
            setPuerto(e.target.value)
          }}/>
          <button onClick={()=>{
            if(ip != '' && puerto !='' && ip != undefined && puerto != undefined){
                const data = {
                    ip,
                    puerto
                  }
                  window.renderer.send('Configurar',data)
                  window.close()
            }
          }}>Configurar</button>
        </div>

      )
}