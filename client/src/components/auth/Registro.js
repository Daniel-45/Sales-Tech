import React, { Component, Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

// Mutation
import { Mutation } from 'react-apollo';
import { NUEVO_USUARIO } from './../../mutations';

// Componentes
import Error from './../alertas/Error';

const initialState = {
    usuario: '',
    nombre: '',
    email: '',
    password: '',
    repetirPassword: '',
    rol: ''
}

class Registro extends Component {
    state = {
        ...initialState
    }

    limpiarState = () => {
        this.setState({
            ...initialState
        });
    }

    // Registrar un usuario
    registroUsuario = (e, insertarUsuario) => {
        e.preventDefault();

        insertarUsuario().then(async ({ data }) => {
            // console.log(data);
            this.limpiarState(); // Limpiar formulario

            // Redirección a usuarios
            this.props.history.push('/usuarios');
        })
        .catch(e => {
            // this.limpiarState();
        })
    }

    // Actualizar el state
    actualizarState = (e) => {
        const { name, value } = e.target;

        // Leer el valor de los inputs y añadir al state
        this.setState({
            [name]: value
        });
    }

    render() {

        const { usuario, nombre, email, password, repetirPassword, rol } = this.state;

        // console.log(this.state);

        // console.log(this.props.session);

        const rolUsuario = this.props.session.getUsuario.rol;

        // Si el rol del usuario logueado no es ADMINISTRADOR
        // Redirección a sus clientes
        const redireccion = (rolUsuario !== 'ADMINISTRADOR') 
        ? <Redirect to="/clientes" />
        : '';

        return (
            <Fragment>
                {redireccion}
                <div className="col-md-8 col-lg-7 sm-12 mt-4 m-auto">
                    <h2 className="text-center mb-4">REGISTRO USUARIOS</h2>
                    <hr/>
                </div>

                <div className="row justify-content-center">
                    <Mutation
                        mutation={NUEVO_USUARIO}
                        variables={{ usuario, nombre, email, password, repetirPassword, rol }}
                    >
                        {(insertarUsuario, { loading, error, data }) => {
                            if (loading) return 'Cargando...'
                            //console.log(data);
                            return (
                                <form
                                    className="col-md-8 col-lg-7 sm-12 mt-4"
                                    onSubmit={e => this.registroUsuario(e, insertarUsuario)}
                                >

                                    {error && <Error error={error} />}

                                    <div className="form-group">
                                        <label htmlFor="usuario" className="font-weight-bold">
                                            Usuario *
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="fas fa-user"></i>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                name="usuario"
                                                className="form-control"
                                                placeholder="Nombre Usuario"
                                                value={usuario}
                                                onChange={this.actualizarState}
                                            />
                                        </div>
                                        <small className="form-text text-muted">
                                            Minúsculas, sin espacios, ni caracteres especiales
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nombre" className="font-weight-bold">
                                            Nombre *
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="fas fa-user"></i>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                name="nombre"
                                                className="form-control"
                                                placeholder="Nombre Completo"
                                                value={nombre}
                                                onChange={this.actualizarState}
                                            />
                                        </div>
                                        <small className="form-text text-muted">
                                            Nombre y apellidos
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" className="font-weight-bold">
                                            Email *
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="fas fa-envelope"></i>
                                                </div>
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="name@example.com"
                                                value={email}
                                                onChange={this.actualizarState}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="password" className="font-weight-bold">
                                                Password *
                                            </label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fas fa-lock"></i>
                                                    </div>
                                                </div>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={this.actualizarState}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="repetirPassword" className="font-weight-bold">
                                                Repetir Password *
                                            </label>

                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fas fa-lock"></i>
                                                    </div>
                                                </div>
                                                <input
                                                    type="password"
                                                    name="repetirPassword"
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder="Repetir Password"
                                                    value={repetirPassword}
                                                    onChange={this.actualizarState}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="rol" className="font-weight-bold">
                                            Rol *
                                        </label>
                                        <select
                                            className="form-control"
                                            name="rol"
                                            value={rol}
                                            onChange={this.actualizarState}
                                        >
                                            <option value="">Seleccionar...</option>
                                            <option value="USUARIO">
                                                USUARIO
                                            </option>
                                            <option value="ADMINISTRADOR">
                                                ADMINISTRADOR
                                            </option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-dark btn-block">
                                        <i className="fas fa-user-plus"></i> Registrar Usuario
                                    </button>
                                </form>
                            )
                        }}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Registro);