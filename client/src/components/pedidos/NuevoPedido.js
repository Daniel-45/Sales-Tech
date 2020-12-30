import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// Query
import { Query } from 'react-apollo';
import { PRODUCTOS_QUERY } from '../../queries';

// CSS Spinner
import './../../spinner.css'

// Componentes
import DatosCliente from './DatosCliente';
import ContenidoPedido from './ContenidoPedido';

// Componente principal que contiene distintos componentes
class NuevoPedido extends Component {
    state = { }

    render() {

        // Obtener id del cliente
        // Hay que pasar este id al componente ContenidoPedido
        const { id } = this.props.match.params;

        // Obtener id del usuario/comercial logueado
        // Hay que pasar este id al componente ContenidoPedido
        // console.log(this.props.session);
        const idComercial = this.props.session.getUsuario.id;

        return (
            <Fragment>
                <h2 className="text-center">NUEVO PEDIDO</h2>
                <hr />
                <div className="row mt-4">
                    <div className="col-lg-4 col-md-12 col-sm-12 my-4">
                        <DatosCliente
                            id={id} // Filtrar por id
                        />
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12 my-4">
                        <Query 
                            query={PRODUCTOS_QUERY} // Obtener productos
                            variables={{stock: true}}
                        >
                            {({ loading, error, data }) => {
                                if (loading) return (
                                    <div className="spinner">
                                        <div className="bounce1"></div>
                                        <div className="bounce2"></div>
                                        <div className="bounce3"></div>
                                    </div>
                                );

                                if (error) return `Error: ${error.message}`;

                                // console.log(data);

                                return (
                                    // Pasar los productos a este componente y leer los productos en el state
                                    <ContenidoPedido
                                        productos={data.getProductos}
                                        id={id} // id del cliente
                                        idComercial={idComercial} // id del usaurio/comercial
                                    />
                                )
                            }}
                        </Query>
                    </div>
                </div>
            </Fragment>

        );
    }
}

export default withRouter(NuevoPedido);