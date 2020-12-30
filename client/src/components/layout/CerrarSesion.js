import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const cerrarSesion = (usuario, history) => {
    localStorage.removeItem('token', '');
    // Desloguear usuario
    usuario.resetStore();
    // Redirección
    history.push('/login');
}

const CerrarSesion = ({history}) => (
    <ApolloConsumer>
        {usuario => {
            return (
                <button
                    onClick={() => cerrarSesion(usuario, history)}
                    className="btn btn-light mt-2 mt-md-0"
                >
                   <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                </button>
            );
        }}
    </ApolloConsumer>
)

export default withRouter(CerrarSesion);