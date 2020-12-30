import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const BotonRegistro = ({ session }) => {
    // console.log(session.session.getUsuario);

    // Obtener rol de usuario
    const { rol } = session.session.getUsuario;

    if (rol !== 'ADMINISTRADOR') return null;

    return (
        <Fragment>
             <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                    <button
                        className="nav-link dropdown-toggle btn btn-block btn-primary text-white"
                        data-toggle="dropdown"
                    >
                        Usuarios
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to="/registro" className="dropdown-item">
                            Nuevo Usuario
                        </Link>
                        <Link to="/usuarios" className="dropdown-item">
                            Listado Usuarios
                        </Link>
                    </div>
                </li>
        </Fragment>
    );

}

export default BotonRegistro;