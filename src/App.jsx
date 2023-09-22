import './Style/AlarmaStyle.css'
import './Style/FormStyle.css'
import { BrowserRouter,Routes,Route, HashRouter} from 'react-router-dom';
import { Login } from './Components/Login';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Menu } from './Components/Menu';
import { CrearUsuario } from './Components/Usuarios/CrearUsuario';
import { EditarUsuario } from './Components/Usuarios/EditarUsuario';
import { EditarCargo } from './Components/Cargos/EditarCargo';
import { CrearCargo } from './Components/Cargos/CrearCargo';
import { CrearTipo } from './Components/TiposLLamados/CrearTipos';
import { EditarTipo } from './Components/TiposLLamados/EditarTipos';
import { CrearArea } from './Components/Areas/CrearAreas';
import { EditarArea } from './Components/Areas/EditarAreas';
import { CrearZona } from './Components/Zonas/CrearZona';
import { EditarZona } from './Components/Zonas/EditarZona';
import { CrearObraSocial } from './Components/ObrasSociales/CrearObraSocial';
import { EditarObraSocial } from './Components/ObrasSociales/EditarObraSocial';
import { SelectUsuario } from './Components/Areas/SelectUsuario';
import { CrearFicha } from './Components/Fichas/CrearFicha';
import {EditarFicha} from './Components/Fichas/EditarFicha'
import { EditarEnfermedad } from './Components/Enfermedades/EditarEnfermedad';
import { CrearEnfermedad } from './Components/Enfermedades/CrearEnfermedad';
import { DetallesFichas } from './Components/Fichas/DetallesFicha';
import config from './Config/settings.json'
import { Configuracion } from './Components/ConfigComponents/Configuracion';
import { ActivarAlarma } from './Components/Alarma/ActivarAlarma';
import { PantallaAlarma } from './Components/Alarma/PantallaAlarma';

function App() {
  const [ip,setIp] = useState(`http://${config[0].ip}:${config[0].puerto}`)
  console.log(ip)
  const socket = io(ip)
  const [usuarios,setUsuarios] = useState([])
  const [fichas,setFichas] = useState([])
  const [areas,setAreas] = useState([])
  const [cargos,setCargos] = useState([])
  const [obrasSociales , setObrasSociales] = useState([])
  const [tipos , setTipos] = useState([])
  const [personalAreas,setPersonalAreas] = useState([])
  const [pacienteEnfermedad,setPacienteEnfermedad] = useState([])
  const [enfermedades,setEnfermedades] = useState([])
  const [zonas,setZonas] = useState([])
  const [puertosSerie,setPuertosSerie] = useState([])
  const [pantallas,setPantallas] = useState([])
  const [llamados,setLlamados] = useState([])

  useEffect(()=>{
    getUsuarios()
    getPaciente()
    getAreas()
    getCargos()
    getObrasSociales()
    getTipos()
    getZonas()
    getPacienteEnfermedad()
    getEnfermedades()
    getPersonalAreas()
    getPuertos()
    getPantalla()
    getLlamados()

    socket.on('alarmaAzul',(area)=>{
      window.renderer.send('AlarmaAzul',area)
    })

    socket.on('update',()=>{
      getPuertos()
      getUsuarios()
      getPaciente()
      getAreas()
      getCargos()
      getObrasSociales()
      getEnfermedades()
      getTipos()
      getZonas()
      getPacienteEnfermedad()
      getPersonalAreas()
      getPantalla()
      getLlamados()
    })

    return ()=>{
      socket.off('alarmaAzul')
      socket.off('update')
    }

  },[])

  async function getUsuarios(){
    try{
        socket.emit('getUsuarios')
        
        await socket.on('getUsuarios',(usuarios)=>{
        setUsuarios(usuarios)
        // console.log(usuarios)
        })
        // 
        
    }catch (error){
        
        getUsuarios()
    }
  }

  async function getPaciente(){
    try{
        socket.emit('getPacientes')
        
        await socket.on('getPacientes',(Fichas)=>{
        setFichas(Fichas)
        // console.log(Fichas)
        })
        // 
        
    }catch (error){
        
        getPaciente()
    }
  }

  async function getAreas(){
    try{
        socket.emit('getAreas')
        
        await socket.on('getAreas',(Areas)=>{
        setAreas(Areas)
        // console.log(Areas)
        })
        // 
        
    }catch (error){
        
        getAreas()
    }
  }

  async function getCargos(){
    try{
        socket.emit('getCargos')
        
        await socket.on('getCargos',(Cargos)=>{
        setCargos(Cargos)
        // console.log(Cargos)
        })
        // 
        
    }catch (error){
        
        getCargos()
    }
  }

  async function getObrasSociales(){
    try{
        socket.emit('getObraSocial')
        
        await socket.on('getObraSocial',(ObrasSociales)=>{
        setObrasSociales(ObrasSociales)
        // console.log(ObrasSociales)
        })
        // 
        
    }catch (error){
        
        getObrasSociales()
    }
  }

  async function getTipos(){
    try{
        socket.emit('getTipos')
        
        await socket.on('getTipos',(Tipos)=>{
        setTipos(Tipos)
        // console.log(Tipos)
        })
        // 
        
    }catch (error){
        
        getTipos()
    }
  }

  async function getEnfermedades(){
    try{
        socket.emit('getEnfermedades')
        
        await socket.on('getEnfermedades',(Enfermedades)=>{
        setEnfermedades(Enfermedades)
        // console.log(Enfermedades)
        })
        // 
        
    }catch (error){
        
        getAreas()
    }
  }

  async function getPacienteEnfermedad(){
    try{
        socket.emit('getPacienteEnfermedad')
        
        await socket.on('getPacienteEnfermedad',(PacienteEnfermedad)=>{
        setPacienteEnfermedad(PacienteEnfermedad)
        // console.log(PacienteEnfermedad)
        })
        // 
        
    }catch (error){
        
        getPacienteEnfermedad()
    }
  }

  async function getPersonalAreas(){
    try{
        socket.emit('getPersonalAreas')
        
        await socket.on('getPersonalAreas',(PersonalAreas)=>{
        setPersonalAreas(PersonalAreas)
        // console.log(PersonalAreas)
        })
        // 
        
    }catch (error){
        
        getPersonalAreas()
    }
  }

  async function getZonas(){
    try{
        socket.emit('getZonas')
        
        await socket.on('getZonas',(Zonas)=>{
        setZonas(Zonas)
        // console.log(Zonas)
        })
        // 
        
    }catch (error){
        
        getZonas()
    }
  }

  async function getLlamados(){
    try{
        socket.emit('getLlamados')
        
        await socket.on('getLlamados',(Llamados)=>{
        setLlamados(Llamados)
        // console.log(Llamados)
        })
        // 
        
    }catch (error){
        
        getLlamados()
    }
  }

  async function getPuertos(){
    try{
        window.renderer.send('getPuertos')
        console.log('Obteniendo puertos ---')
        await window.renderer.receive('puertos-serie',(puertos)=>{
        setPuertosSerie(puertos)
        console.log(puertos,'puertos')
        })
        // 
        
    }catch (error){
        
        // getPuertos()
    }
  }

  async function getPantalla(){
    try{
        window.renderer.send('getPantallas')
        console.log('Obteniendo Pantallas ---')
        await window.renderer.receive('getPantallas',(display)=>{
        setPantallas(display)
        console.log(pantallas,'pantallas')
        })
    }catch (error){
        
        // getPuertos()
    }
  }

  return (
    <HashRouter>
        <Routes>
            <Route path='/' element={<Login usuarios={usuarios} socket={socket}/>}/>
            <Route path='/menu/:idusuario' element={<Menu llamados={llamados} puertosSerie={puertosSerie} fichas={fichas} zonas={zonas} enfermedades={enfermedades} tipos={tipos} areas={areas} obrasSociales={obrasSociales} PacienteEnfermedad={pacienteEnfermedad} PersonalAreas={personalAreas} cargos={cargos} usuarios={usuarios} socket={socket}/>}/>
            <Route path='/crearUsuario' element={<CrearUsuario areas={areas} cargos={cargos}  socket={socket}/>}/>
            <Route path='/editarUsuario/:id' element={<EditarUsuario cargos={cargos} usuarios={usuarios}  socket={socket}/>}/>
            <Route path='/crearCargo' element={<CrearCargo cargos={cargos}  socket={socket}/>}/>
            <Route path='/editarCargo/:id' element={<EditarCargo cargos={cargos}  socket={socket}/>}/>
            <Route path='/crearTipo' element={<CrearTipo tipos={tipos}  socket={socket}/>}/>
            <Route path='/editarTipo/:id' element={<EditarTipo tipos={tipos}  socket={socket}/>}/>
            <Route path='/crearArea' element={<CrearArea areas={areas} socket={socket}/>}/>
            <Route path='/editarArea/:id' element={<EditarArea areas={areas}  socket={socket}/>}/>
            <Route path='/SelectUsuario/:id' element={<SelectUsuario personalAreas={personalAreas} areas={areas} usuarios={usuarios} cargos={cargos}  socket={socket}/>}/>
            <Route path='/crearZona' element={<CrearZona zonas={zonas}  socket={socket}/>}/>
            <Route path='/editarZona/:id' element={<EditarZona zonas={zonas}  socket={socket}/>}/>
            <Route path='/crearObraSocial' element={<CrearObraSocial obrasSociales={obrasSociales}  socket={socket}/>}/>
            <Route path='/editarObraSocial/:id' element={<EditarObraSocial obrasSociales={obrasSociales}  socket={socket}/>}/>
            <Route path='/crearFicha' element={<CrearFicha enfermedades={enfermedades} fichas={fichas} usuarios={usuarios} obrasSociales={obrasSociales} areas={areas} socket={socket}/>}/>
            <Route path='/editarFicha/:id' element={<EditarFicha enfermedades={enfermedades} pacienteEnfermedad={pacienteEnfermedad} fichas={fichas} usuarios={usuarios} obrasSociales={obrasSociales} areas={areas}  socket={socket}/>}/>
            <Route path='/detallesFicha/:id' element={<DetallesFichas enfermedades={enfermedades} pacienteEnfermedad={pacienteEnfermedad} fichas={fichas} usuarios={usuarios} obrasSociales={obrasSociales} areas={areas}  socket={socket}/>}/>
            <Route path='/crearEnfermedad' element={<CrearEnfermedad enfermedades={enfermedades} socket={socket}/>}/>
            <Route path='/editarEnfermedad/:id' element={<EditarEnfermedad enfermedades={enfermedades}  socket={socket}/>}/>
            <Route path='/config/' element={<Configuracion socket={socket}/>}/>
            <Route path='/alarmaAzul/' element={<ActivarAlarma areas={areas} socket={socket}/>}/>
            <Route path='/AlarmaPantalla/:idarea' element={<PantallaAlarma areas={areas} socket={socket}/>}/>
        </Routes>
    </HashRouter>
  );
}

export default App;
