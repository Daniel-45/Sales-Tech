import React from 'react';

// Query
import { Query, Mutation } from 'react-apollo';
import { PRODUCTO_QUERY } from './../../queries';

// Mutation
import { ACTUALIZAR_ESTADO } from './../../mutations';

// Componentes
import DatosProducto from './DatosProducto';

const Pedido = (props) => {

    const pedido = props.pedido;

    // console.log(props);

    const { id } = pedido;

    // Fecha del pedido
    const fecha = new Date(Number(pedido.fecha));

    // Estado y clases de estado del pedido
    const { estado } = pedido;

    // console.log(estado);

    let clase;

    if (estado === 'PENDIENTE') {
        clase = 'border-info'; // Clase de Bootstrap
    } else if (estado === 'CANCELADO') {
        clase = 'border-danger'; // Clase de Bootstrap
    } else {
        clase = 'border-success'; // Clase de Bootstrap
    }

    return (
        <div className="col-md-6 col-lg-6 sm-12 mt-4">
            <div className={`card mb-3 ${clase}`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                           <Mutation mutation={ACTUALIZAR_ESTADO}>
                            {actualizarEstadoPedido => (
                                <select
                                    className="form-control my-3"
                                    value={pedido.estado}
                                    onChange={e => {
                                        // console.log(e.target.value);
                                        const input = {
                                            id: id,
                                            // props del pedido PedidosCliente
                                            pedido: pedido.pedido,
                                            fecha: pedido.fecha,
                                            total: pedido.total,
                                            // El id del cliente se pasa como props del componente PedidosCliente
                                            cliente: props.cliente,
                                            // Cambiar el estado del pedido
                                            estado: e.target.value 
                                        }
                                        // console.log(input);

                                        actualizarEstadoPedido({
                                            variables: { input }
                                        })
                                    }}
                                >
                                    <option value="PENDIENTE">PENDIENTE</option>
                                    <option value="CANCELADO">CANCELADO</option>
                                    <option value="COMPLETADO">COMPLETADO</option>
                                </select>
                            )}
                        </Mutation>
                    </p>
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal">
                            {` ${pedido.id}`}
                        </span>
                    </p>
                    <p className="card-text font-weight-bold">Fecha Pedido:
                        <span className="font-weight-normal">
                            {` ${fecha.toLocaleString('es-ES')}`}
                        </span>
                    </p>

                    <h4 className="card-text text-center bg-dark p-2 text-white rounded mb-3">
                        Artículos del pedido
                    </h4>
                    {pedido.pedido.map((producto, index) => {
                        // console.log(producto);

                        // Obtener el id de cada producto
                        // Traer toda la información de la base de datos
                        const { id } = producto;

                        return (
                            <Query
                                key={pedido.id + index} // Evitar id repetido
                                query={PRODUCTO_QUERY}
                                // id del producto
                                variables={{ id }}
                            >
                                {({ loading, error, data }) => {
                                    if (loading) return 'Cargando...';
                                    if (error) return `Error: ${error.message}`;

                                    // console.log(data);

                                    return (
                                        <DatosProducto
                                            key={producto.id}
                                            producto={data.getProducto}
                                            cantidad={producto.cantidad}
                                        />
                                    )
                                }}
                            </Query>
                        )
                    })}

                    <p className="card-text total font-weight-bold badge badge-dark p-2 float-right">
                        Total:
                        <span className="font-weight-normal">
                            {` ${pedido.total.toFixed(2)}`}€
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Pedido;