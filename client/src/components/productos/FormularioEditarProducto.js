import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Mutation
import { Mutation } from 'react-apollo';
import { ACTUALIZAR_PRODUCTO } from './../../mutations';

const initialState = {
    nombre: '',
    precio: '',
    stock: ''
}

class FormularioEditarProducto extends Component {
    state = {
        ...this.props.producto.getProducto
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

    editarProducto = (e, actualizarProducto) => {
        e.preventDefault();

        actualizarProducto().then(data => {
            // console.log(data);
            this.setState({
                ...initialState
            })
        })
    }

    render() {
        const { nombre, precio, stock } = this.state;

        const { id } = this.props;

        // La variable input tiene los valores que necesito enviar al mutation
        const input = {
            id,
            nombre: nombre,
            precio: Number(precio),
            stock: Number(stock)
        }
        return (
            <Mutation
                key={id}
                mutation={ACTUALIZAR_PRODUCTO}
                variables={{ input }}
                onCompleted={() => this.props.refetch().then(() => {
                    this.props.history.push('/productos');
                })}
            >
                {(actualizarProducto, { loading, error, data }) => {
                    return (
                        <form
                            className="col-md-8 col-lg-7 sm-12 mt-4"
                            onSubmit={e => this.editarProducto(e, actualizarProducto)}
                        >
                            <div className="form-group">
                                <label htmlFor="nombre" className="font-weight-bold">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    placeholder="Nombre del Producto"
                                    value={nombre}
                                    onChange={this.actualizarState}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="precio" className="font-weight-bold">Precio</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">€</div>
                                    </div>
                                    <input
                                        type="number"
                                        name="precio"
                                        className="form-control"
                                        placeholder="Precio del Producto"
                                        value={precio}
                                        onChange={this.actualizarState}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock" className="font-weight-bold">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    className="form-control"
                                    placeholder="Stock del Producto"
                                    value={stock}
                                    onChange={this.actualizarState}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={this.validarForm()}
                                className="btn btn-dark btn-block">
                                Guardar Cambios
                            </button>
                        </form>
                    )
                }}
            </Mutation>
        );
    }
}

export default withRouter(FormularioEditarProducto);