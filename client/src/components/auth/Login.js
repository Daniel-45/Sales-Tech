import React, { Component, Fragment } from 'react';

import { withRouter } from 'react-router-dom';

import Error from '../alertas/Error';

// Mutation
import { Mutation } from 'react-apollo';
import { AUTENTICAR_USUARIO } from './../../mutations';

const initialState = {
    usuario: '',
    password: ''
}

class Login extends Component {
    state = {
        ...initialState
    }

    actualizarState = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    limpiarState = () => {
        this.setState({ ...initialState });
    }

    iniciarSesion = (e, usuarioAutenticar) => {
        e.preventDefault();

        // Función del mutation
        usuarioAutenticar().then(async ({ data }) => {
            // console.log(data);
            // console.log(data.autenticarUsuario.token);

            // Almacenar en Local Storage
            localStorage.setItem('token', data.autenticarUsuario.token);

            // Ejecutar query después de iniciar sesión
            await this.props.refetch();

            // Limpiar el state
            this.limpiarState();

            // Redirección
            setTimeout(() => {
                this.props.history.push('/panel');
            }, 500)

        })
            .catch(e => {
                this.limpiarState();
            })
    }

    validarForm = () => {
        const { usuario, password } = this.state;

        const noValido = !usuario || !password;

        // console.log(noValido);

        return noValido;
    }

    render() {

        const { usuario, password } = this.state;

        return (
            <Fragment>
                <div className="container-login">
                    <div className="col-md-6 col-lg-6 col-sm-12 m-auto">
                        <h2 className="text-center">INICIAR SESIÓN</h2>
                        <hr />
                    </div>

                    <div className="row justify-content-center">
                        <Mutation
                            mutation={AUTENTICAR_USUARIO}
                            variables={{ usuario, password }}
                        >
                            {(usuarioAutenticar, { loading, error, data }) => {

                                return (
                                    <form
                                        onSubmit={e => this.iniciarSesion(e, usuarioAutenticar)}
                                        className="col-md-6 col-lg-6 col-sm-12"
                                    >

                                        {error && <Error error={error} />}

                                        <div className="form-group">
                                            <label htmlFor="usuario" className="font-weight-bold">
                                                Usuario
                                        </label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fas fa-user"></i>
                                                    </div>
                                                </div>
                                                <input
                                                    onChange={this.actualizarState}
                                                    value={usuario}
                                                    type="text"
                                                    name="usuario"
                                                    className="form-control"
                                                    placeholder="Nombre Usuario"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="font-weight-bold">
                                                Password
                                        </label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fas fa-lock"></i>
                                                    </div>
                                                </div>
                                                <input
                                                    onChange={this.actualizarState}
                                                    value={password}
                                                    type="password"
                                                    name="password"
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder="Password"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            disabled={
                                                loading || this.validarForm()
                                            }
                                            type="submit"
                                            className="btn btn-dark btn-block">
                                            Iniciar Sesión
                            </button>

                                    </form>
                                )
                            }}
                        </Mutation>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Login);