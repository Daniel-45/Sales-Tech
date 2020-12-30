import React, { Component, Fragment } from 'react';

class Producto extends Component {
    state = { }
    render() { 

        const { producto } = this.props;

        // console.log(producto);

        return ( 
            <Fragment>
                <tr>
                    <td>{producto.nombre}</td>
                    <td>{producto.precio}€</td>
                    <td>{producto.stock}</td>
                    <td>
                        <input
                            min="0"
                            type="number"
                            className="form-control"
                            onChange={e => {
                                // Validar que la cantidad pedida del producto no supera el stock
                                if (e.target.value > producto.stock) {
                                    e.target.value = 0
                                }
                                this.props.actualizarCantidad(e.target.value, this.props.index)
                            }}
                        />
                    </td>
                    <td>
                        <button 
                            type="button"
                            className="btn btn-danger"
                            // El id del producto estará en los props que se pasan a este componente
                            onClick={e => this.props.eliminarProducto(producto.id)}
                        >
                        <i className="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </Fragment>
         );
    }
}
 
export default Producto;