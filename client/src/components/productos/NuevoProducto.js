import React, { Component, Fragment } from 'react';

// Mutation
import { Mutation } from 'react-apollo';
import { NUEVO_PRODUCTO } from './../../mutations'

const initialState = {
    nombre: '',
    precio: '',
    stock: ''
}

class NuevoProducto extends Component {
    state = {
       ...initialState // Copia del state inicial
    }

    // Método para actualizar el state
    actualizarState = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    // Método para limpiar el state
    limpiarState = () => {
        this.setState({
            ...initialState
        });
    }

    // Validar formulario
    // Deshabilitar botón hasta que todos los campos tengan un valor
    validarForm = () => {
        const { nombre, precio, stock } = this.state;

        const noValido = !nombre || !precio || !stock;

        return noValido;
    }

    crearNuevoProducto = (e, insertarProducto) => {
        e.preventDefault();

        // Insertar en base de datos
        insertarProducto().then(data => {
            // console.log(data);
            this.limpiarState();

            // Redirección a listado de productos
            this.props.history.push('/productos')
        })
    }

    render() {
        const { nombre, precio, stock } = this.state;

        // La variable input tiene los valores que necesito enviar al mutation
        const input = {
            nombre: nombre,
            precio: Number(precio),
            stock: Number(stock)
        }

        return (
            <Fragment>
                <div className="col-md-8 col-lg-7 sm-12 mt-4 m-auto">
                    <h2 className="text-center">NUEVO PRODUCTO</h2>
                    <hr/>
                </div>
                <div className="row justify-content-center">
                    <Mutation 
                        mutation={NUEVO_PRODUCTO}
                        variables={{input}}
                    >
                        {(insertarProducto, { loading, error, data }) => {
                            if (loading) return 'Cargando...';
                            if (error) return `Error: ${error.message}`
                            // console.log(data);
                            
                            return (
                                <form 
                                    className="col-md-8 col-lg-7 sm-12 sm-12 mt-4"
                                    onSubmit={e => this.crearNuevoProducto(e, insertarProducto)}
                                >
                                    <div className="form-group">
                                        <label htmlFor="nombre" className="font-weight-bold">
                                            Nombre *
                                        </label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            className="form-control"
                                            placeholder="Nombre del Producto"
                                            onChange={this.actualizarState}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="precio" className="font-weight-bold">
                                            Precio *
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">€</div>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                name="precio"
                                                className="form-control"
                                                placeholder="Precio del Producto"
                                                onChange={this.actualizarState}
                                            />
                                        </div>
                                    </div>
                                    <div htmlFor="stock" className="form-group">
                                        <label className="font-weight-bold">
                                            Stock *
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            className="form-control"
                                            placeholder="Stock del Producto"
                                            onChange={this.actualizarState}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-dark btn-block"
                                        disabled={this.validarForm()}
                                    >
                                       <i className="fas fa-plus-square"></i> Añadir Producto
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

export default NuevoProducto;