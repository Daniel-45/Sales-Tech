import React, { Fragment } from 'react';

// CSS Spinner
import './../../spinner.css'

// Query
import { Query } from 'react-apollo';
import { PEDIDOS_QUERY } from './../../queries';

// Componentes
import Pedido from './Pedido';

const PedidosCliente = (props) => {

    // console.log(props);

    // Obtener id del cliente que queremos consultar sus pedidos
    const cliente = props.match.params.id;

    // console.log(cliente);

    return (
        <Fragment>
            <div className="col-12 mb-4 m-auto">
                <h2 className="text-center">PEDIDOS CLIENTE</h2>
                <hr />
            </div>
            <div className="row">
                <Query
                    query={PEDIDOS_QUERY}
                    variables={{ cliente }} // id del cliente
                    pollInterval={1000}
                >
                    {({ loading, error, data, startPolling, stopPolling }) => {
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
                            data.getPedidos.map(pedido => (
                                // Componente pedido
                                <Pedido
                                    key={pedido.id}
                                    // Objeto pedido completo para acceder a los datos
                                    pedido={pedido}
                                    // id del cliente que ha realizado el pedido
                                    cliente={cliente}
                                />
                            ))
                        )
                    }}
                </Query>
            </div>
        </Fragment>
    );
}

export default PedidosCliente;