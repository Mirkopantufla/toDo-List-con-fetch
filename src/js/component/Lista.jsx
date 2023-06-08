import React from 'react'

const Lista = ({ label, funcion }) => {

    return (
        <li className="list-group-item d-flex justify-content-between botonX">
            {label}
            <button onClick={funcion}>X</button>
        </li>
    )
}

export default Lista