import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Componentes
import CerrarSesion from './CerrarSesion';
import BotonRegistro from './BotonRegistro';

const Header = ({ session }) => {

    // console.log(session);

    let menuNavegacion = (session.getUsuario)
        ? <NavegacionAutenticado session={session} />
        : <NavegacionNoAutenticado />

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark d-flex mb-5">
            <div className="container col-md-12 col-lg-10">
                {menuNavegacion}
            </div>
        </nav>
    )
}

const NavegacionNoAutenticado = () => (
    <Link to="/" className="navbar-brand text-light font-weight-bold">
        SALESTECH
    </Link>
);

const NavegacionAutenticado = (session) => (
    <Fragment>
        {/* Link es una característica de react-router-dom */}
        <Link to="/panel" className="navbar-brand text-light font-weight-bold">
            SALESTECH
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navegacion">
            <ul className="navbar-nav ml-auto text-right">
                <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                    <button
                        className="nav-link dropdown-toggle btn btn-block btn-primary text-white"
                        data-toggle="dropdown"
                    >
                        Clientes
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to="/clientes/nuevo" className="dropdown-item">
                            Nuevo Cliente
                        </Link>
                        <Link to="/clientes" className="dropdown-item">
                            Listado Clientes
                        </Link>
                    </div>
                </li>
                <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                    <button
                        className="nav-link dropdown-toggle btn btn-block btn-primary text-white"
                        data-toggle="dropdown"
                    >
                        Productos
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to="/productos/nuevo" className="dropdown-item">
                            Nuevo Producto
                        </Link>
                        <Link to="/productos" className="dropdown-item">
                            Listado Productos
                        </Link>
                    </div>
                </li>
                <BotonRegistro session={session} />
                <CerrarSesion />
            </ul>
        </div>
    </Fragment>
);

export default Header;