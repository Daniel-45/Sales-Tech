import React, { Component, Fragment } from 'react';
import Select from 'react-select' // Librería para el select de productos
import Animated from 'react-select/animated' // Animación del select productos

// Componentes
import DatosPedido from './DatosPedido';
import GenerarPedido from './GenerarPedido';
import Error from './../alertas/Error'

class ContenidoPedido extends Component {

    state = {
        productos: [],
        total: 0
    }

    seleccionarProducto = (productos) => {
        this.setState({
            productos
        });
        // console.log(productos);
    }

    actualizarTotal = () => {
        // Leer state de productos
        const productos = this.state.productos;  // Copia del state

        // Cuando todos los productos están a cero
        if (productos.length === 0) {
            this.setState({
                total: 0
            });
            return;
        }

        let totalPedido = 0;

        // Realizar operación cantidad * precio
        productos.map(producto => totalPedido += (producto.cantidad * producto.precio));

        this.setState({
            total: totalPedido
        });
    }

    actualizarCantidad = (cantidad, index) => {
        // console.log(cantidad);

        // Leer state de productos
        const productos = this.state.productos;  // Copia del state

        // Actualizar cantidad de los productos
        // Añadir la cantidad desde la interfaz
        // El index cambia en el state cada vez que añades o eliminas productos
        productos[index].cantidad = Number(cantidad); // Añadir a los productos

        // console.log(productos);

        // Validar

        // Añadir al state definitivo
        // Después de que el state se actualiza con la cantidad de productos se actualiza el total
        this.setState({
            productos
        }, () => {
            // Después de actualizar la cantidad de productos del state
            this.actualizarTotal();
        });
    }

    // Eliminar producto desde el botón
    eliminarProducto = (id) => {
        // console.log(id);

        const productos = this.state.productos; // Copia del state

        // Al eliminar un producto con filter recorremos cada uno de los productos y devuelve todos excepto el registro que estoy eliminando
        const restoDeProductos = productos.filter(producto => producto.id !== id);

        // Después de eliminar un producto vuelve a actualizar el total
        this.setState({
            productos: restoDeProductos // Eliminar del state
        }, () => {
            // Después de actualizar la cantidad de productos del state
            this.actualizarTotal();
        });
    }

    render() {
        // Validar que no se introduce una cantidad de productos negativa al hacer el pedido
        const mensaje = (this.state.total < 0) ? <Error error="La cantidad no puede ser negativa" /> : '';

        return (
            <Fragment>
                <div className="mb-4">
                    <h4 className="text-center mt-4 mb-4">SELECCIONAR PRODUCTOS</h4>
                    {mensaje}
                    <Select
                        onChange={this.seleccionarProducto} // Obtener el producto seleccionado
                        // Guardar en el state
                        options={this.props.productos} // Viene del componente NuevoPedido
                        isMulti={true} // Multiples opciones (varios productos)
                        components={Animated()}
                        placeholder={'Seleccionar productos...'}
                        // Opciones configuradas de la librería React Select
                        // Configurar value y label con los productos de la base de datos
                        getOptionValue={(options) => options.id}
                        getOptionLabel={(options) => options.nombre}
                        // Reescribir el state de productos (eliminar también del buscador)
                        value={this.state.productos}
                    />
                    <DatosPedido
                        productos={this.state.productos}
                        actualizarCantidad={this.actualizarCantidad}
                        eliminarProducto={this.eliminarProducto}
                    />

                    <p className="badge badge-info p-2 font-weight-bold float-right mt-4">
                        Total: {this.state.total.toFixed(2)}€
                </p>

                    <GenerarPedido
                        productos={this.state.productos}
                        total={this.state.total}
                        idCliente={this.props.id}
                        idComercial={this.props.idComercial}
                    />
                </div>
            </Fragment>
        );
    }
}

export default ContenidoPedido;