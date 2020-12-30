import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Mutation
import { Mutation } from 'react-apollo';
import { ACTUALIZAR_USUARIO } from './../../mutations';

class FormularioEditarUsuario extends Component {

    state = {
        usuario: this.props.usuario
    }

    render() {

        const {id, usuario, nombre, email, password, repetirPassword, rol } = this.state.usuario;

        console.log(this.props.usuario);

        return (
            <Mutation 
                mutation={ACTUALIZAR_USUARIO}
                onCompleted={() => this.props.refetch().then(() => {
                    this.props.history.push('/usuarios');
                })}
            >
                {actualizarUsuario => (
                    <form
                        className="col-md-6 col-lg-6 sm-12"
                        onSubmit={e => {
                            e.preventDefault();
                            actualizarUsuario({
                                variables: {id, usuario, nombre, email, password, repetirPassword, rol}
                            });
                        }}
                    >
                        <div className="form-group mt-5">
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
                                    defaultValue={usuario}
                                    onChange={e => {
                                        this.setState({
                                            usuario: {
                                                ...this.state.usuario,
                                                usuario: e.target.value
                                            }
                                        })
                                    }}
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
                                    defaultValue={nombre}
                                    onChange={e => {
                                        this.setState({
                                            usuario: {
                                                ...this.state.usuario,
                                                nombre: e.target.value
                                            }
                                        })
                                    }}
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
                                    defaultValue={email}
                                    onChange={e => {
                                        this.setState({
                                            usuario: {
                                                ...this.state.usuario,
                                                email: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
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
                                        defaultValue={password}
                                        onChange={e => {
                                            this.setState({
                                                usuario: {
                                                    ...this.state.usuario,
                                                    password: e.target.value
                                                }
                                            })
                                        }}
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
                                onChange={e => {
                                    this.setState({
                                        usuario: {
                                            ...this.state.usuario,
                                            rol: e.target.value
                                        }
                                    })
                                }}
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
                            <i className="fas fa-user"></i> Editar Usuario
                        </button>
                    </form>
                )}
            </Mutation>
        );
    }
}

export default withRouter(FormularioEditarUsuario);