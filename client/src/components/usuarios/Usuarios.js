import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

// Componentes
import Exito from './../alertas/Exito'
import Paginador from './../Paginador';

// Queries
import { USUARIOS_QUERY } from './../../queries';

// Mutation
import { ELIMINAR_USUARIO } from './../../mutations'

class Usuarios extends Component {

    // Número de elementos a mostrar por página
    // Lo paso como propiedad en el paginador
    // Si hay que modificar el número de elementos a mostrar solo se hace aquí
    limite = 3;

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

        return (
            <Fragment>
                <h2 className="text-center">LISTADO DE USUARIOS</h2>
                {alerta}

                <Query
                    query={USUARIOS_QUERY}
                    pollInterval={1000}
                    variables={{ limit: this.limite, offset: this.state.paginador.offset }}
                >
                    {({ loading, error, data, startPolling, stopPolling }) => {
                        if (loading) return 'Cargando...';
                        if (error) return `Error: ${error.message}`;
                        // console.log(data);

                        return (
                            <Fragment>
                                <div className="mt-4">
                                    <ul className="list-group">
                                        {data.getUsuarios.map(item => {
                                            const { id } = item;
                                            return (
                                                <li key={id} className="list-group-item">
                                                    <div className="row justify-content-between align-items-center">
                                                        <div className="col-md-6">
                                                            <p>
                                                                <span className="font-weight-bold">Nombre de usuario:</span> {item.usuario}
                                                            </p>
                                                            <p>
                                                                <span className="font-weight-bold">Nombre:</span> {item.nombre}
                                                            </p>
                                                            <p>
                                                                <span className="font-weight-bold">Email:</span> {item.email}
                                                            </p>
                                                            <p>
                                                                <span className="font-weight-bold">Rol:</span> {item.rol}
                                                            </p>
                                                        </div>
                                                        <div className="col-md-6 d-flex container-btn-user justify-content-end">
                                                            <Link
                                                                to={`/usuarios/editar/${id}`}
                                                                className="btn btn-primary btn-client d-block d-md-inline-block mr-2"
                                                            >
                                                                <i className="fas fa-user-cog"></i> Editar
                                                            </Link>

                                                            <Mutation
                                                                mutation={ELIMINAR_USUARIO}
                                                                // data contiene lo que hay en el resolver como respuesta
                                                                onCompleted={(data) => {
                                                                    // console.log(data);
                                                                    this.setState({
                                                                        alerta: {
                                                                            mostrar: true,
                                                                            mensaje: data.eliminarUsuario
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
                                                                {eliminarUsuario => (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-danger"
                                                                        onClick={() => {
                                                                            if (window.confirm('¿Seguro que quieres eliminar este usuario?')) {
                                                                                eliminarUsuario({
                                                                                    variables: { id }
                                                                                })
                                                                            }
                                                                        }}
                                                                    >
                                                                        <i className="fas fa-trash"></i> Eliminar
                                                                    </button>
                                                                )}
                                                            </Mutation>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <Paginador
                                        // Hay que pasar el total de usuarios en la base de datos
                                        // Saber cuantos usuarios hay y cuántas páginas debe crear
                                        actual={this.state.paginador.actual}
                                        total={data.totalUsuarios}
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
        );
    }
}

export default Usuarios;