import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom'; // Para poder acceder a history (redirección)

// Mutation
import { ACTUALIZAR_CLIENTE } from './../../mutations';

class FormularioEditarCliente extends Component {

    // Cargar en el state los props (datos) del cliente
    state = {
        cliente: this.props.cliente,
        emails: this.props.cliente.emails
    }

    nuevoEmail = () => {
        this.setState({
            emails: this.state.emails.concat([{ email: '' }])
        })
    }

    leerEmail = (i) => (e) => {
        const nuevoEmail = this.state.emails.map((email, index) => {
            if (i !== index) return email;
            return { ...email, email: e.target.value };
        });
        this.setState({ emails: nuevoEmail });
    }

    eliminarEmail = (i) => () => {
        this.setState({
            emails: this.state.emails.filter((s, index) => i !== index)
        });
    }

    render() {

        const { nombre, apellidos, edad, tipo, telefono, movil, empresa, cif } = this.state.cliente;

        // console.log(this.props);

        return (
            <Mutation
                mutation={ACTUALIZAR_CLIENTE}
                // Redirección a listado de clientes al hacer la inserción
                // Función refetch para refrescar caché de Apollo
                // Al llamar a refetch vuelve a realizar la consulta
                // Paso refetch por props del componente EditarCliente
                onCompleted={() => this.props.refetch().then(() => {
                    this.props.history.push('/clientes');
                })}
            >
                {actualizarCliente => (
                    <form
                        className="col-md-8 col-lg-7 sm-12 m-auto mt-4"
                        onSubmit={e => {
                            e.preventDefault();
                            const { id, nombre, apellidos, edad, tipo, telefono, movil, empresa, cif } = this.state.cliente

                            const { emails } = this.state;

                            // Si se hacen cambios se actualiza el state
                            const input = {
                                id,
                                nombre,
                                apellidos,
                                edad: Number(edad),
                                tipo,
                                telefono,
                                movil,
                                emails,
                                empresa,
                                cif
                            }

                            // console.log(input);

                            // Mutation para actualizar cliente
                            actualizarCliente({
                                variables: { input }
                            });

                        }}
                    >
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="font-weight-bold">Nombre *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    // Pasar los datos tiene que ser defaultValue para editar
                                    defaultValue={nombre}
                                    // Leer campo nombre, modificar el state
                                    onChange={e => {
                                        this.setState({
                                            cliente: {
                                                ...this.state.cliente,
                                                nombre: e.target.value
                                            }
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="font-weight-bold">Apellidos *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    // Pasar los datos tiene que ser defaultValue para editar
                                    defaultValue={apellidos}
                                    // Leer campo nombre, modificar el state
                                    onChange={e => {
                                        this.setState({
                                            cliente: {
                                                ...this.state.cliente,
                                                apellidos: e.target.value
                                            }
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="font-weight-bold">Edad *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    // Pasar los datos tiene que ser defaultValue para editar
                                    defaultValue={edad}
                                    // Leer campo nombre, modificar el state
                                    onChange={e => {
                                        this.setState({
                                            cliente: {
                                                ...this.state.cliente,
                                                edad: e.target.value
                                            }
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="font-weight-bold">Tipo Cliente *</label>
                                <select
                                    className="form-control"
                                    value={tipo}
                                    onChange={e => {
                                        this.setState({
                                            cliente: {
                                                ...this.state.cliente,
                                                tipo: e.target.value
                                            }
                                        });
                                    }}
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="BASICO">BÁSICO</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="font-weight-bold">Teléfono</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // Pasar los datos tiene que ser defaultValue para editar
                                        defaultValue={telefono}
                                        // Leer campo edad, modificar el state
                                        onChange={e => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    telefono: e.target.value
                                                }
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="font-weight-bold">Móvil</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fas fa-mobile-alt"></i>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // Pasar los datos tiene que ser defaultValue para editar
                                        defaultValue={movil}
                                        // Leer campo edad, modificar el state
                                        onChange={e => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    movil: e.target.value
                                                }
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            {/* Carga automáticamente los emails del cliente */}
                            {this.state.emails.map((input, index) => (
                                <div key={index} className="form-group col-md-12">
                                    <label className="font-weight-bold">
                                        Email {index + 1}
                                    </label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-envelope"></i>
                                            </div>
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="name@example.com"
                                            className="form-control"
                                            onChange={this.leerEmail(index)}
                                            defaultValue={input.email}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={this.eliminarEmail(index)}
                                            >
                                                <i className="fas fa-trash"></i> Eliminar
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="form-group d-flex justify-content-center col-md-12">
                                {/* Botón para añadir emails */}
                                <button
                                    onClick={this.nuevoEmail}
                                    type="button"
                                    className="btn btn-dark btn-block"
                                >
                                    <i className="fas fa-envelope"></i> Añadir Email
                                    </button>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="font-weight-bold">Empresa *</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fas fa-building"></i>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // Pasar los datos tiene que ser defaultValue para editar
                                        defaultValue={empresa}
                                        // Leer campo empresa, modificar el state
                                        onChange={e => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    empresa: e.target.value
                                                }
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="font-weight-bold">CIF *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    // Pasar los datos tiene que ser defaultValue para editar
                                    defaultValue={cif}
                                    // Leer campo empresa, modificar el state
                                    onChange={e => {
                                        this.setState({
                                            cliente: {
                                                ...this.state.cliente,
                                                cif: e.target.value
                                            }
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark btn-block">
                            <i className="fas fa-user-cog"></i> Guardar Cambios
                        </button>
                    </form>
                )}
            </Mutation>
        )
    }
}

// Redireccionar
// Función widRouter para poder tener la propiedad history en este componente
export default withRouter(FormularioEditarCliente);