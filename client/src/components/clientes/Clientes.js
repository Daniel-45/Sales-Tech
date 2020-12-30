import React, { Fragment, Component } from 'react';
import { Query } from 'react-apollo';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

// Componentes
import Exito from './../alertas/Exito';
import Paginador from './../Paginador';

// Mutations
import { ELIMINAR_CLIENTE } from './../../mutations';

// Queries
import { CLIENTES_QUERY } from './../../queries';

class Clientes extends Component {

    // Número de elementos a mostrar por página
    // Lo paso como propiedad en el paginador
    // Si hay que modificar el número de elementos a mostrar solo se hace aquí
    limite = 6;

    state = {
        alerta: {
            mostrar: false,
            mensaje: ''
        },
        paginador: {
            offset: 0,
            actual: 1
        }
    }

    // Métodos para la páginas anterior y siguiente
    // Hay que pasar los dos métodos al paginador
    paginaAnterior = () => {
        this.setState({
            paginador: {
                // No hay que hacer copia del state
                // Hay que reescribir la página acyual y el offset
                // Hay que leer y reescribir el offset en cada llamada
                offset: this.state.paginador.offset - this.limite,
                actual: this.state.paginador.actual - 1
            }
        });
    }

    paginaSiguiente = () => {
        this.setState({
            paginador: {
                // No hay que hacer copia del state
                // Hay que reescribir la página acyual y el offset
                // Hay que leer y reescribir el offset en cada llamada
                offset: this.state.paginador.offset + this.limite,
                actual: this.state.paginador.actual + 1
            }
        });
    }

    render() {
        const { alerta: { mostrar, mensaje } } = this.state;

        const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : '';

        // Obtener el id del usuario/comercial para mostrar sus clientes
        // console.log(this.props.session.getUsuario);
        // const id = this.props.session.getUsuario.id;

        let id;

        const { rol } = this.props.session.getUsuario;

        if (rol === 'USUARIO') {
            id = this.props.session.getUsuario.id;
        } else {
            id = '';
        }

        return (
            // Hay que rodear todo el componente
            // Todo lo que va a formar parte del Query entre los tags de Query
            <Query
                query={CLIENTES_QUERY} // Conexión entre el código de GrapQL y React Apollo
                pollInterval={1000} // Refrescar la vista
                variables={{
                    limit: this.limite,
                    offset: this.state.paginador.offset,
                    comercial: id
                }}
            >
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if (loading) return 'Cargando...';
                    if (error) return `Error: ${error.message}`
                    // console.log(data);

                    return (
                        <Fragment>
                            <h2 className="text-center">LISTADO DE CLIENTES</h2>
                            {alerta}

                            <div className="mt-4">
                                {data.getClientes.map(item => {
                                    const { id } = item; // Para eliminar el cliente
                                    return (
                                        <div key={item.id} className="list-group-item">
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-lg-4 col-md-12 col-sm-12">
                                                    <p>
                                                        Nombre: {item.nombre} {item.apellidos}
                                                    </p>
                                                    <p>
                                                        Empresa: {item.empresa}
                                                    </p>
                                                </div>
                                                <div className="col-lg-8 col-md-12 col-sm-12 container-btn-client d-flex justify-content-end">
                                                    <Link
                                                        to={`/pedidos/nuevo/${id}`}
                                                        className="btn btn-success btn-client d-block d-md-inline-block mr-2"
                                                    >
                                                        <i className="fas fa-plus-square"></i> Nuevo Pedido
                                                    </Link>
                                                    <Link
                                                        to={`/pedidos/${id}`}
                                                        className="btn btn-success btn-client d-block d-md-inline-block mr-2"
                                                    >
                                                        <i className="fas fa-eye"></i> Ver Pedido
                                                    </Link>
                                                    <Link
                                                        to={`/correo`}
                                                        className="btn btn-success btn-client d-block d-md-inline-block mr-2"
                                                    >
                                                        <i className="fas fa-envelope"></i> Enviar Email
                                                    </Link>
                                                    <Link
                                                        to={`/clientes/editar/${item.id}`}
                                                        className="btn btn-primary btn-client d-block d-md-inline-block mr-2"
                                                    >
                                                        <i className="fas fa-user-cog"></i> Editar
                                                    </Link>
                                                    <Mutation
                                                        mutation={ELIMINAR_CLIENTE}
                                                        // data contiene lo que hay en el resolver como respuesta
                                                        onCompleted={(data) => {
                                                            // console.log(data);
                                                            this.setState({
                                                                alerta: {
                                                                    mostrar: true,
                                                                    mensaje: data.eliminarCliente
                                                                }
                                                            }, () => {
                                                                setTimeout(() => {
                                                                    this.setState({
                                                                        alerta: {
                                                                            mostrar: false,
                                                                            mensaje: ''
                                                                        }
                                                                    });
                                                                }, 3000)
                                                            })
                                                        }}
                                                    >
                                                        {eliminarCliente => (
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-client d-block d-md-inline-block"
                                                                onClick={() => {
                                                                    if (window.confirm('¿Seguro que quieres eliminar este cliente?')) {
                                                                        eliminarCliente({
                                                                            variables: { id }
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                <i className="fas fa-trash"></i> Eliminar
                                                            </button>
                                                        )}
                                                    </Mutation>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <Paginador
                                // Hay que pasar el total de clientes en la base de datos
                                // Saber cuántos clientes hay y cuántas páginas debe crear
                                actual={this.state.paginador.actual}
                                total={data.totalClientes}
                                limite={this.limite}
                                paginaAnterior={this.paginaAnterior}
                                paginaSiguiente={this.paginaSiguiente}
                            />
                        </Fragment>
                    )
                }}
            </Query>
        )
    }
}

export default Clientes;