import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

// Componentes
import Exito from './../alertas/Exito';
import Paginador from './../Paginador';

// Queries
import { PRODUCTOS_QUERY } from './../../queries';

// Mutation
import { ELIMINAR_PRODUCTO } from './../../mutations'

class Productos extends Component {

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

        // mostrar será true al completar el mutation de eliminar producto
        // El mensaje viene del resolver
        const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : '';

        return (
            <Fragment>
                <h2 className="text-center">LISTADO DE PRODUCTOS</h2>
                {alerta}

                <Query
                    query={PRODUCTOS_QUERY}
                    pollInterval={1000}
                    variables={{ limit: this.limite, offset: this.state.paginador.offset }}
                >
                    {({ loading, error, data, startPolling, stopPolling }) => {
                        if (loading) return 'Cargando...';
                        if (error) return `Error: ${error.message}`
                        // console.log(data);

                        return (
                            <Fragment>
                                <div className="table-responsive">
                                    <table className="table mt-4">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">NOMBRE</th>
                                                <th scope="col">PRECIO</th>
                                                <th scope="col">STOCK</th>
                                                <th scope="col">EDITAR</th>
                                                <th scope="col">ELIMINAR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.getProductos.map(item => {
                                                const { id } = item;

                                                const { stock } = item;

                                                // Avisos para el stock
                                                let clase;

                                                if (stock <= 50) {
                                                    clase = 'table-danger';
                                                } else if (stock > 50 && stock <= 100) {
                                                    clase = 'table-warning';
                                                }

                                                // console.log(item);

                                                return (
                                                    <tr key={id} className={clase}>
                                                        <td>{item.nombre}</td>
                                                        <td>{item.precio}€</td>
                                                        <td>{item.stock}</td>
                                                        <td>
                                                            <Link
                                                                to={`/productos/editar/${id}`}
                                                                className="btn btn-primary d-block d-md-inline-block mr-2"
                                                            >
                                                                <i className="fas fa-user-cog"></i> Editar
                                                        </Link>
                                                        </td>
                                                        <td>
                                                            <Mutation
                                                                mutation={ELIMINAR_PRODUCTO}
                                                                // data contiene lo que hay en el resolver como respuesta
                                                                onCompleted={(data) => {
                                                                    // console.log(data);
                                                                    this.setState({
                                                                        alerta: {
                                                                            mostrar: true,
                                                                            mensaje: data.eliminarProducto
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
                                                                {eliminarProducto => (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-danger"
                                                                        onClick={() => {
                                                                            if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
                                                                                eliminarProducto({
                                                                                    variables: { id }
                                                                                })
                                                                            }
                                                                        }}
                                                                    >
                                                                        <i className="fas fa-trash"></i> Eliminar
                                                                    </button>
                                                                )}
                                                            </Mutation>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    <Paginador
                                        // Hay que pasar el total de clientes en la base de datos
                                        // Saber cuantos clientes hay y cuántas páginas debe crear
                                        actual={this.state.paginador.actual}
                                        total={data.totalProductos}
                                        limite={this.limite}
                                        paginaAnterior={this.paginaAnterior}
                                        paginaSiguiente={this.paginaSiguiente}
                                    />
                                </div>
                            </Fragment>
                        )
                    }}
                </Query>
            </Fragment>
        )
    }
}

export default Productos;