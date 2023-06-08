import React, { useEffect, useRef, useState } from 'react'
import Lista from './Lista.jsx';

const ListaTareas = () => {

    //URL base de la API para hacer fetch
    let urlMirko = 'http://assets.breatheco.de/apis/fake/todos/user/mirko';

    //Un solo ref al input para vaciarlo cada vez que le de a enter
    const refInput = useRef("");

    const [inputValue, setInputValue] = useState("");

    const [tareas, setTareas] = useState([]);

    useEffect(() => {

        fetchTarea(urlMirko)
            .then((respuesta) => respuesta.json())
            .then((data) => {
                setTareas(data)
            })
            .catch((error) => console.log(error));

    }, []);

    //----------------------------------------------------------------------------------------------------
    //Un solo fetch para todas las funciones de la API
    const fetchTarea = (url, options = {}) => {
        return fetch(url, options);
    }

    //----------------------------------------------------------------------------------------------------
    //Funcion para crear el usuario en un principio
    const createTarea = (data) => {
        let options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }

        }

        fetchTarea(urlMirko, options)
            .then((response) => response.json())
            .then((responseJson) => console.log(responseJson))
            .catch((error) => console.log(error));
    }

    //----------------------------------------------------------------------------------------------------
    //Funcion para pasar el arreglo de tareas actual a la API 
    const updateTarea = (data) => {
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetchTarea(urlMirko, options)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => console.log(error));
    }

    //----------------------------------------------------------------------------------------------------
    //Funcion para borrar todas las tareas
    const borrarTareas = () => {
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetchTarea(urlMirko, options)
            .then((response) => response.json())
            .catch((error) => console.log(error));
    }

    //----------------------------------------------------------------------------------------------------
    //Funcion para actualizar el valor del imput, por cada tecla se actualiza en el onchange de input
    const cambioInput = (e) => {
        setInputValue(e.target.value);
    }

    //----------------------------------------------------------------------------------------------------
    //Funcion para controlar el submit del form
    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevaTarea = {
            label: inputValue,
            done: false
        }

        if (e.label !== "") {

            const tareasActualizadas = [...tareas, nuevaTarea]

            setTareas(tareasActualizadas)

            updateTarea(tareasActualizadas);

            //Dejo vacio el campo input y el valor del estado
            refInput.current.value = "";
            setInputValue("");
        }

    }

    //----------------------------------------------------------------------------------------------------
    //Funcion para eliminar la tarea dependiendo de la posicion del array
    const eliminarTarea = (posicion) => {
        const nuevasTareas = tareas.filter((tarea) => tarea !== tareas[posicion]);
        setTareas(nuevasTareas)
        updateTarea(nuevasTareas);
    }

    //----------------------------------------------------------------------------------------------------
    //Funcion para eliminar todas las tareas tanto de la API como de front, tambien,
    //Crea nuevamente el usuario con un array vacio, el cual por defecto viene con una tarea.
    const eliminarTodasLasTareas = () => {
        setTareas([]);
        borrarTareas([]);
        createTarea([]);
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <input ref={refInput} className='form-control' type="text" name="" onChange={cambioInput} />
            </form>
            <ul className='list-group'>
                {
                    tareas.length == 0 ?
                        <li className='list-group-item d-flex justify-content-center text-dark text-opacity-50'>{tareas.length} tareas, añade una tarea</li>
                        : tareas.map((tarea, i) => <Lista key={i} label={tarea.label} funcion={() => eliminarTarea(i)} />)
                }
                {
                    tareas.length == 1 ? <small className='text-dark text-opacity-50'>{tareas.length} tarea pendiente</small>
                        : tareas.length > 1 ? <small className='text-dark text-opacity-50'>{tareas.length} tareas pendientes</small>
                            : ""
                }
            </ul>
            <div className='text-center mt-2'>
                <button className='btn btn-danger' onClick={eliminarTodasLasTareas}>Borrar TODO</button>
            </div>
        </>
    )
}

export default ListaTareas