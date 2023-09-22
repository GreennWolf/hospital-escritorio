import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../Style/Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faUsers , faClipboard, faCube, faBed, faUserDoctor, faNotesMedical, 
        faSquare, faSliders, faPlus, faMagnifyingGlass, faPencil, faArrowRight, faArrowLeft,
        faHeadSideCough , faGear,faPhone, faBook, faPhoneFlip, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'




export function Menu({cargos, usuarios,tipos,llamados,enfermedades,puertosSerie,areas,PacienteEnfermedad,PersonalAreas,zonas,fichas,obrasSociales, socket }) {
  const { idusuario } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usuarios);
  const [tab, setTab] = useState("Usuarios"); // Inicialmente, mostrar la pestaña de Usuarios
  const [menuStyle , setMenuStyle] = useState('menu')
  const [ip,setIp] = useState()
  const [puerto,setPuerto] = useState()
  const [puertoSelected,setPuertoSelected] = useState(puertosSerie[0]?.path)
  const [areaSelected,setAreaSelected] = useState(areas[0]?.id)
  const [zonaSelected,setZonaSelected] = useState(zonas[0]?.id)
  
  function transformarFechaYAsignar(fechaOriginal) {
    // Crear un objeto de fecha a partir de la cadena original
    const fecha = new Date(fechaOriginal);
  
    // Obtener componentes de fecha (año, mes y día)
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11
    const dia = fecha.getDate().toString().padStart(2, '0');
  
    // Formatear la fecha en el formato válido para el input date
    const fechaFormateada = `${dia}/${mes}/${año}`;
    return fechaFormateada
  }

  useEffect(() => {
    const user = usuarios.find((user) => user.id == idusuario);
    setUsuario(user);
  }, [idusuario]);

  useEffect(() => {
    // Filtrar usuarios cuando el valor de búsqueda cambie
    const filtered = usuarios.filter((user) =>
      user.nombre.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, usuarios]);

  useEffect(()=>{
  setPuertoSelected(puertosSerie[0]?.path)
  setAreaSelected(areas[0]?.id)
  setZonaSelected(zonas[0]?.id)
  },[areas,zonas,puertosSerie])
  
  const renderTabContent = () => {
    switch (tab) {
      case "Usuarios":
        return (
          <div className="tab">
            <div className="title">
              <h1>USUARIOS</h1>
            </div>
          <div className="cont">
              
            <div className="options">
              <input
                className="searchInput"
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                />
              <button className="crearBtn" role="button" onClick={()=>{
                window.renderer.send('crearUsuario')
              }}><FontAwesomeIcon icon={faPlus} beat  style={{color: "#ffffff",}} /></button>
            </div>
            <table className="menuTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Contraseña</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>D.N.I</th>
                  <th>Cargo</th>
                  <th>Admin</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const cargo = cargos.find(cargo => cargo.id == user.idcargo)
                  return <tr key={user.id}>
                    <td>{user.nombre}</td>
                    <td>{user.apellido}</td>
                    <td>{user.password}</td>
                    <td>{user.email}</td>
                    <td>{user.telefono}</td>
                    <td>{user.dni}</td>
                    <td>{cargo?.nombre}</td>
                    <td>{user.admin == 1 ? 'Si' : 'No'}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 5,
                      }}
                    >
                      <div className="edit" onClick={()=>{
                        let id = parseInt(user.id); // Convierte user.id a un número y almacénalo en id
                        window.renderer.send('editarUsuario', id);
                      }}><FontAwesomeIcon icon={faPencil} size="2xs" style={{color: "#ffffff",}} /></div>
                      <div className="delete" onClick={()=>{
                        socket.emit('deleteUsuario',user.id)
                      }}><FontAwesomeIcon icon={faTrashCan} size="2xs" style={{color: "#ffffff",}} /></div>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
              </div>
        );
      case "Fichas":
        return (
          <div className="tab">
            <div className="title">
              <h1>Fichas</h1>
            </div>
          <div className="cont">
              
            <div className="options">
              <input
                className="searchInput"
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                />
              <button className="crearBtn" onClick={()=>{
                window.renderer.send('crearFicha')
              }}><FontAwesomeIcon icon={faPlus} beat  style={{color: "#ffffff",}} /></button>
            </div>
            <table className="menuTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>D.N.I</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Area</th>
                  <th>Enfermero/a</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {fichas.map((paciente) => {
                  const area = areas.find(area => area.id == paciente.idarea)
                  const personal = usuarios.find(personal => personal.id == paciente.idpersonal)
                  const fecha = transformarFechaYAsignar(paciente.nacimiento)
                  return <tr key={paciente.id}>
                    <td>{paciente.nombre}</td>
                    <td>{paciente.apellido}</td>
                    <td>{paciente.dni}</td>
                    <td>{fecha}</td>
                    <td>{area?.nombre}</td>
                    <td>{personal?.nombre +' ' + personal?.apellido}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 5,
                      }}
                    >
                      <div className="edit" onClick={()=>{
                        window.renderer.send('detallesFicha',paciente.id)
                      }}><FontAwesomeIcon icon={faBook} size="4xs" style={{color: "#ffffff",}} /></div>
                      <div className="edit" onClick={()=>{
                        let id = parseInt(paciente.id); // Convierte paciente.id a un número y almacénalo en id
                        window.renderer.send('editarFicha', id);
                      }}><FontAwesomeIcon icon={faPencil} size="2xs" style={{color: "#ffffff",}} /></div>
                      <div className="delete" onClick={()=>{
                        socket.emit('deletePaciente',paciente.id)
                      }}><FontAwesomeIcon icon={faTrashCan} size="2xs" style={{color: "#ffffff",}} /></div>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
              </div>
        );
        case "Llamados":
        return (
          <div className="tab">
            <div className="title">
              <h1>Llamados</h1>
            </div>
          <div className="cont">
              
            <div className="options">
              <input
                className="searchInput"
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                />
            </div>
            <table className="menuTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Area</th>
                  <th>Zona</th>
                  <th>Tipo</th>
                  <th>Personal Acargo</th>
                  <th>Horario de LLamada</th>
                  <th>Horario de Atencion</th>
                </tr>
              </thead>
              <tbody>
                {
                  llamados.map(llamado =>{
                    const paciente = fichas.find(paciente => paciente.id == llamado.idpaciente)
                    const area = areas.find(area => area.id == llamado.idarea)
                    const tipo = tipos.find(tipo => tipo.id == llamado.idtipo)
                    const zona = zonas.find(zona => zona.id == llamado.idzona)
                    const horarioF = llamado.horario_atencion != null ? llamado.horario_atencion :'No fue atendido'
                    const personal = usuarios.find(personal => personal.id == paciente.idpersonal)
                    return <tr>
                      <td>{paciente?.nombre}</td>
                      <td>{paciente?.apellido}</td>
                      <td>{area?.nombre}</td>
                      <td>{zona?.nombre}</td>
                      <td>{tipo?.nombre}</td>
                      <td>{personal?.nombre + ' ' + personal?.apellido}</td>
                      <td>{llamado?.horario_llamada}</td>
                      <td>{horarioF}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
              </div>
        );
      case "Areas":
        return (
          <div className="tab">
          <div className="title">
            <h1>Areas</h1>
          </div>
          <div className="cont">

            <div className="options">
              <input
                className="searchInput"
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button className="crearBtn" onClick={()=>{
                  window.renderer.send('crearArea')
              }}><FontAwesomeIcon icon={faPlus} beat  style={{color: "#ffffff",}} /></button>
            </div>
            <table className="menuTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {areas.map((area) => (
                  <tr key={area.id}>
                    <td>{area.nombre}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 5,
                      }}
                      >
                      <div className="edit" onClick={()=>{
                        let id = parseInt(area.id); // Convierte area.id a un número y almacénalo en id
                        window.renderer.send('editarArea', id);
                      }}><FontAwesomeIcon icon={faPencil} size="2xs" style={{color: "#ffffff",}} /></div>
                      <div className="delete" onClick={()=>{
                        socket.emit('deleteArea',area.id)
                      }}><FontAwesomeIcon icon={faTrashCan} size="2xs" style={{color: "#ffffff",}} /></div>
                      <button onClick={()=>{
                        window.renderer.send('selectUser',area.id)
                      }}>Asignar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            </div>
        );
      case "Zonas":
        return (
          <div className="tab">
             <div className="title">
            <h1>Zonas</h1>
             </div>
          <div className="cont">

            <div className="options">
              <input
                className="searchInput"
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button className="crearBtn" onClick={()=>{
                window.renderer.send('crearZona')
              }}><FontAwesomeIcon icon={faPlus} beat  style={{color: "#ffffff",}} /></button>
            </div>
            <table className="menuTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {zonas.map((zona) => (
                  <tr key={zona.id}>
                    <td>{zona.nombre}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 5,
                      }}
                    >
                      <div className="edit" onClick={()=>{
                        let id = parseInt(zona.id); // Convierte zona.id a un número y almacénalo en id
                        window.renderer.send('editarZona', id);
                      }}><FontAwesomeIcon icon={faPencil} size="2xs" style={{color: "#ffffff",}} /></div>
                      <div className="delete" onClick={()=>{
                        socket.emit('deleteZona',zona.id)
                      }}><FontAwesomeIcon icon={faTrashCan} size="2xs" style={{color: "#ffffff",}} /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           </div>
        );
      case "Obras Sociales":
        return (
          <div className="tab">
             <div className="title">
            <h1>Obras Sociales</h1>
             </div>
          <div className="cont">

            <div className="options">
              <input
                className="searchInput"
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button className="crearBtn" onClick={()=>{
                  window.renderer.send('crearObraSocial')
              }}><FontAwesomeIcon icon={faPlus} beat  style={{color: "#ffffff",}} /></button>
            </div>
            <table className="menuTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {obrasSociales.map((obra) => (
                  <tr key={obra.id}>
                    <td>{obra.nombre}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 5,
                      }}
                      >
                      <div className="edit" onClick={()=>{
                        let id = parseInt(obra.id); // Convierte zona.id a un número y almacénalo en id
                        window.renderer.send('editarObraSocial', id);
                      }}><FontAwesomeIcon icon={faPencil} size="2xs" style={{color: "#ffffff",}} /></div>
                      <div className="delete" onClick={()=>{
                        socket.emit('deleteObraSocial',obra.id)
                      }}><FontAwesomeIcon icon={faTrashCan} size="2xs" style={{color: "#ffffff",}} /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            </div>
        );
      case "Cargos":
        return (
          <div className="tab">
             <div className="title">
            <h1>Cargos</h1>
             </div>
          <div className="cont">

            <div className="options">
              <input
                className="searchInput"
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button className="crearBtn" onClick={()=>{
                  window.renderer.send('crearCargo')
                }}><FontAwesomeIcon icon={faPlus} beat  style={{color: "#ffffff",}} /></button>
            </div>
            <table className="menuTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cargos.map((cargo) => (
                  <tr key={cargo.id}>
                    <td>{cargo.nombre}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 5,
                      }}
                      >
                      <div className="edit" onClick={()=>{
                        let id = parseInt(cargo.id); // Convierte cargo.id a un número y almacénalo en id
                        window.renderer.send('editarCargo', id);
                      }}><FontAwesomeIcon icon={faPencil} size="2xs" style={{color: "#ffffff",}} /></div>
                      <div className="delete" onClick={()=>{
                        socket.emit('deleteCargo',cargo.id)
                      }}><FontAwesomeIcon icon={faTrashCan} size="2xs" style={{color: "#ffffff",}} /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        );
      case "Tipos":
        return (
          <div className="tab">
          <div className="title">
            <h1>Tipos</h1>
          </div>
          <div className="cont">            
            <div className="options">
              <input
                className="searchInput"
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button className="crearBtn" onClick={()=>{
                  window.renderer.send('crearTipo')
              }}><FontAwesomeIcon icon={faPlus} beat  style={{color: "#ffffff",}} /></button>
            </div>
            <table className="menuTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tipos.map((tipo) => (
                  <tr key={tipo.id}>
                    <td>{tipo.nombre}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 5,
                      }}
                    >
                      <div className="edit" onClick={()=>{
                        let id = parseInt(tipo.id); // Convierte cargo.id a un número y almacénalo en id
                        window.renderer.send('editarTipo', id);
                      }}><FontAwesomeIcon icon={faPencil} size="2xs" style={{color: "#ffffff",}} /></div>
                      <div className="delete" onClick={()=>{
                        socket.emit('deleteTipo',tipo.id)
                      }}><FontAwesomeIcon icon={faTrashCan} size="2xs" style={{color: "#ffffff",}} /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        );
        case "Enfermedades":
          return (
            <div className="tab">
            <div className="title">
              <h1>Enfermedades</h1>
            </div>
            <div className="cont">            
              <div className="options">
                <input
                  className="searchInput"
                  type="text"
                  placeholder="Buscar"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button className="crearBtn" onClick={()=>{
                    window.renderer.send('crearEnfermedad')
                }}><FontAwesomeIcon icon={faPlus} beat  style={{color: "#ffffff",}} /></button>
              </div>
              <table className="menuTable">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {enfermedades.map((Enfermedade) => (
                    <tr key={Enfermedade.id}>
                      <td>{Enfermedade.nombre}</td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 5,
                        }}
                      >
                        <div className="edit" onClick={()=>{
                          let id = parseInt(Enfermedade.id); // Convierte cargo.id a un número y almacénalo en id
                          window.renderer.send('editarEnfermedad', id);
                        }}><FontAwesomeIcon icon={faPencil} size="2xs" style={{color: "#ffffff",}} /></div>
                        <div className="delete" onClick={()=>{
                          socket.emit('deleteEnfermedad',Enfermedade.id)
                        }}><FontAwesomeIcon icon={faTrashCan} size="2xs" style={{color: "#ffffff",}} /></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          );
      case "Botoneras":
        return (
          <div className="tab">
            <div className="title">
            <h1>Botoneras</h1>
            </div>
            <div className="cont">
            <form action="">
              <select name="puertos" id="puertos" onChange={(e)=>{
                      setPuertoSelected(e.target.value)
                      console.log(e.target.value)
                    }}>
                {
                  puertosSerie.map(puerto =>{
                    return <option value={puerto.path} >{puerto.friendlyName}</option>
                  })
                }
              </select>
              <select name="area" id="area" onChange={(e)=>{
                setAreaSelected(e.target.value)
              }}>
                {
                  areas.map(area => {
                    return <option value={area.id}>{area.nombre}</option>
                  })
                }
              </select>
              <select name="zona" id="zona" onChange={(e)=>{
                setZonaSelected(e.target.value)
              }}>
                {
                  zonas.map(zona => {
                    return <option value={zona.id}>{zona.nombre}</option>
                  })
                }
              </select>
              <button onClick={(e)=>{
                e.preventDefault()
                const data ={
                  puerto:puertoSelected,
                  idarea:areaSelected,
                  idzona:zonaSelected
                }
                console.log(data)
                window.renderer.send('configurarArduino',data)
              }}>Enviar</button>
            </form>
          </div>
          </div>
        );
      default:
        return null; // Por defecto, no mostrar ninguna pestaña
    }
  };

  return (
    <main className={'menuContainer'}>
      <div className={menuStyle}>
        <div className={`opcion ${tab === "Usuarios" ? "active" : ""}`} onClick={() => setTab("Usuarios")}>
        <FontAwesomeIcon icon={faUsers} style={{color: "#ff7f00",}} />
        <p>USUARIOS</p>
        </div>
        <div className={`opcion ${tab === "Fichas" ? "active" : ""}`} onClick={() => setTab("Fichas")}>
        <FontAwesomeIcon icon={faClipboard} style={{color: "#ff7f00",}} />
        <p>FICHAS</p>
        </div>
        <div className={`opcion ${tab === "Llamados" ? "active" : ""}`} onClick={() => setTab("Llamados")}>
        <FontAwesomeIcon icon={faPhoneAlt} style={{color: "#ff7f00",}} /> 
        <p>LLAMADOS</p>
        </div>
        <div className={`opcion ${tab === "Areas" ? "active" : ""}`} onClick={() => setTab("Areas")}>
        <FontAwesomeIcon icon={faCube} style={{color: "#ff7f00",}} /> 
        <p>AREAS</p>
        </div>
        <div className={`opcion ${tab === "Zonas" ? "active" : ""}`} onClick={() => setTab("Zonas")}>
        <FontAwesomeIcon icon={faSquare} style={{color: "#ff7f00"}} /> 
        <p>ZONAS</p>
        </div>
        <div className={`opcion ${tab === "Obras Sociales" ? "active" : ""}`} onClick={() => setTab("Obras Sociales")}>
        <FontAwesomeIcon icon={faNotesMedical} style={{color: "#ff7f00",}} />
        <p>OBRAS SOCIALES</p>
        </div>
        <div className={`opcion ${tab === "Cargos" ? "active" : ""}`} onClick={() => setTab("Cargos")}>
        <FontAwesomeIcon icon={faUserDoctor} style={{color: "#ff7f00",}} /> 
        <p>CARGOS</p>
        </div>
        <div className={`opcion ${tab === "Tipos" ? "active" : ""}`} onClick={() => setTab("Tipos")}>
        <FontAwesomeIcon icon={faSliders} style={{color: "#ff7f00",}} /> 
        <p>TIPOS</p> 
        </div>
        <div className={`opcion ${tab === "Enfermedades" ? "active" : ""}`} onClick={() => setTab("Enfermedades")}>
        <FontAwesomeIcon icon={faHeadSideCough} style={{color: "#ff7f00",}} /> 
        <p>ENFERMEDADES</p>
        </div>
        <div className={`opcion ${tab === "Botoneras" ? "active" : ""}`} onClick={() => setTab("Botoneras")}>
        <FontAwesomeIcon icon={faPhone} style={{color: "#ff7f00",}} />
        <p>BOTONERAS</p>
        </div>
      </div>
      <button
  className="close"
  onClick={() => {
    setMenuStyle(prevMenuStyle => {
      return prevMenuStyle === 'menu' ? 'menu hidden' : 'menu';
    });
  }}
>
  {menuStyle === 'menu' ? <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff" }} /> : <FontAwesomeIcon icon={faArrowRight} style={{color: "#ffffff",}} />}
</button>

      <div className="pantalla">
        {renderTabContent()}
      </div>
    </main>
  );
}
