import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function SelectUsuario({usuarios,cargos,personalAreas,socket }) {
    const [personalSelected, setPersonalSelected] = useState([]);

    const [personalDeselected,setpersonalDeselected] = useState([])

    const {id} = useParams()
    // console.log(usuarios)


    function handleSubmit(){
        personalSelected.map(idP =>{
            console.log(id)
            let data = {
                idpersonal:idP,
                idarea:id,
            }
            console.log('pa',data)

            socket.emit('addPersonalArea',data)
            window.close()
        })

        personalDeselected.map(idP =>{
            console.log(idP,id,'desel')
            console.log(idP,'deselected')
            const pa = personalAreas.find(pa => pa.idarea == id && pa.idpersonal == idP)
            if(pa != undefined){
                socket.emit('deletePersonalArea',pa.id)
                console.log('ready deleted')
                window.close()
            }else{
                console.log(pa,'pa')
            }
        })
    }

    return (
        <main>
            <div className="formcont">
            <div className="title">
                <h1>Personal a Asignar</h1>
            </div>
        <div className="date">
        <table className="menuTable">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cargo</th>
                <th>Asignado</th>
            </tr>
            </thead>
            <tbody>
            {usuarios.map((user) => {
                const cargo = cargos.find((cargo) => cargo.id == user.idcargo);
                if(personalAreas != '' && personalAreas != undefined){
                    const asignado = personalAreas.find(asignado => asignado.idarea == id && asignado.idpersonal == user.id)
                const asig = asignado != undefined ? true : false;
                return (
                <tr key={user.id}>
                    <td>{user.nombre}</td>
                    <td>{user.apellido}</td>
                    <td>{cargo?.nombre}</td>
                    <td>
                    <input
                        type="checkbox"
                        defaultChecked={asig}
                        onChange={(e) => {
                        const userId = user.id;

                        if (e.target.checked) {
                            personalAreas.map(pa =>{
                                if(asig == true && personalDeselected.includes(userId)){
                                    setpersonalDeselected(personalDeselected.filter((id) => id !== userId));
                                }else{
                                    setPersonalSelected([...personalSelected, userId]);
                                }
                            })
                        } else {
                            if(asig == true){
                                personalDeselected.push(userId)
                            }
                            // Checkbox desmarcado, eliminar user.id de personalSelected
                            if(personalSelected.includes(user.id)){
                                setPersonalSelected(personalSelected.filter((id) => id !== userId));
                            }
                        }
                        }}
                    />
                    </td>
                </tr>
                );
                }
            })}
            </tbody>
        </table>
        <button onClick={()=>{
            handleSubmit()
        }}>Guardar</button>
        </div>
        </div>
        </main>
    );
}
