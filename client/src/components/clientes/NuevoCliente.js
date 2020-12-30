import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// Mutations
import { Mutation } from 'react-apollo';
import { NUEVO_CLIENTE } from './../../mutations';

class NuevoCliente extends Component {
    state = {
        cliente: {
            nombre: '',
            apellidos: '',
            edad: '',
            tipo: '',
            telefono: '',
            movil: '',
            email: '',
            empresa: '',
            cif: '',
        },
        error: false, // Propiedad del state para validar el formulario
        mensaje: '', // Mensaje de error de validación en función del error
        emails: []
    }

    // Método para leer y almacenar los distintos emails en el state
    // Dos arrow functions para evitar que se ejecute la función automáticamente
    // Le paso el índice para saber en que campo escribo
    // Le paso el evento para obtener el valor de ese campo
    leerEmail = (i) => (e) => {
        // console.log(i);
        // console.log(e.target.value);
        const nuevoEmail = this.state.emails.map((email, index) => {
            // Si el campo es diferente al que estoy escribiendo no hacer nada
            if (i !== index) return email;
            // Si es el campo correcto tomar lo que hay en el state 
            return {
                ...email,
                email: e.target.value
            }
        });

        // Añadir email al array de emails
        this.setState({
            emails: nuevoEmail
        });
    }

    // Método para añadir campos para emails
    nuevoEmail = () => {
        this.setState({
            emails: this.state.emails.concat([{ email: '' }])
        });
    }

    // Método para eliminar campos para emails
    // Devolver todos los elementos que no sean iguales al index que paso
    // Dos arrow functions para evitar que se ejecute la función automáticamente
    eliminarEmail = (i) => () => {
        // console.log(`Has hecho clic en eliminar email ${i}`);
        this.setState({
            // Filter se pasa un parámetro a quitar y retorna el resto
            emails: this.state.emails.filter((email, index) => i !== index)
        });
    }

    render() {

        // console.log(this.props.session);

        // Asignar a la constante idComercial el id del usuario logeado
        const idComercial = this.props.session.getUsuario.id;

        const { error, mensaje } = this.state;

        let errorMensaje = (error)
            ?
            <div className="alert alert-danger p3 text-center col-md-8 col-lg-7 sm-12 m-auto">
                {mensaje}
            </div>
            : ''

        return (
            <Fragment>
                <div className="col-md-8 col-lg-7 sm-12 mt-4 m-auto">
                    <h2 className="text-center">NUEVO CLIENTE</h2>
                    <hr/>
                </div>
                {/* Mostrar mensaje de error validar formulario */}
                <div className=" mt-4">
                    {errorMensaje}
                </div>

                {/* Mutation cierra al final del formulario */}
                <Mutation
                    mutation={NUEVO_CLIENTE}
                    // Callback que se ejecuta cuando el mutation se ha realizado
                    // Redirección a la página principal al hacer la inserción
                    onCompleted={() => this.props.history.push('/clientes')}
                >
                    {/* Utilizar la función del Mutation - prop children */}
                    {insertarCliente => (
                        <div className="row justify-content-center">
                            <form className="col-md-8 col-lg-7 sm-12 m-auto mt-4"
                                onSubmit={e => {
                                    // Evitar acción por defecto enviar el formulario
                                    e.preventDefault();
                                    const { nombre, apellidos, edad, tipo, telefono, movil, empresa, cif } = this.state.cliente

                                    const { emails } = this.state;

                                    // Validar campos obligatorios
                                    if (nombre === '' || apellidos === '' || edad === '' || tipo === '' || empresa === '' || cif === '') {
                                        this.setState({
                                            error: true,
                                            mensaje: 'Los campos con asterisco son obligatorios'
                                        });
                                        return;
                                    }

                                    // Validar introducir al menos un email 
                                    if (emails.length <= 0) {
                                        this.setState({
                                            error: true,
                                            mensaje: 'Tiene que registrar un email de contacto'
                                        });
                                        return;
                                    }

                                    // Comprobar que ningún email esté sin valor
                                    for (let i = 0; i < emails.length; i++) {
                                        if (this.state.emails[i].email === '') {
                                            this.setState({
                                                error: true,
                                                mensaje: 'El campo email no puede estar vacío'
                                            });
                                            return;
                                        }
                                    }

                                    // Validar una edad válida
                                    if (edad < 18 || edad > 90) {
                                        this.setState({
                                            error: true,
                                            mensaje: 'Tiene que introducir una edad válida entre 18 y 90 años'
                                        });
                                        return;
                                    }

                                    // Si la inserción es correcta con todos los cmapos
                                    this.setState({
                                        error: false
                                    });

                                    // Variables del objeto cliente
                                    // La función insertarCliente del mutation toma un input
                                    const input = {
                                        nombre: nombre,
                                        apellidos: apellidos,
                                        edad: Number(edad),
                                        tipo: tipo,
                                        telefono: telefono,
                                        movil: movil,
                                        emails: emails,
                                        empresa: empresa,
                                        cif: cif,
                                        comercial: idComercial
                                    };
                                    // Función del mutation
                                    insertarCliente({
                                        variables: { input }
                                    })
                                }}
                            >
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="font-weight-bold">Nombre *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre del cliente"
                                            // Pasar el evento para leer el valor del campo
                                            // Leer campo nombre, modificar el state
                                            onChange={e => {
                                                this.setState({
                                                    cliente: {
                                                        // Copia del state
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
                                            placeholder="Apellidos del cliente"
                                            // Leer campo apellidos, modificar el state
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
                                            type="number"
                                            className="form-control"
                                            placeholder="Edad del cliente"
                                            // Leer campo edad, modificar el state
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
                                            // Leer campo tipo cliente, modificar el state
                                            onChange={e => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        tipo: e.target.value
                                                    }
                                                });
                                            }}
                                        >
                                            <option value="">Selecciona...</option>
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
                                                placeholder="Teléfono"
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
                                                placeholder="Teléfono móvil"
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
                                            onClick={this.nuevoEmail} // Nuevo campo
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
                                            placeholder="Empresa del cliente"
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
                                            placeholder="CIF de la empresa"
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
                                    <i className="fas fa-user-plus"></i> Añadir Cliente
                            </button>
                            </form>
                        </div>
                    )}
                </Mutation>
            </Fragment>
        );
    }
}

export default withRouter(NuevoCliente);