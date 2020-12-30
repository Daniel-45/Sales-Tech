import React, { Fragment } from 'react';

// Componentes
import Producto from './Producto';

const DatosPedido = (props) => {

    // Tener los productos en este componente
    const productos = props.productos;
    
    // console.log('Productos: ' + productos.length);

    // Si no hay productos no se muestra la tabla
    // Productos viene del componente ContenidoPedido
    if (!productos || productos.length === 0)  return null;
    
    return (
        <Fragment>
            <h5 className="text-center my-4">DATOS DEL PEDIDO</h5>

            <div className="table-responsive">
                <table className="table product-table">
                    <thead className="thead-dark">
                        <tr className="font-weight-bold">
                            <th>PRODUCTO</th>
                            <th>PRECIO</th>
                            <th>STOCK</th>
                            <th>CANTIDAD</th>
                            <th>ELIMINAR</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.map((producto, index) => (
                            <Producto
                                key={producto.id}
                                id={producto.id}
                                producto={producto} // Objeto producto
                                index={index}
                                // Componente ContenidoPedido
                                actualizarCantidad={props.actualizarCantidad} 
                                eliminarProducto={props.eliminarProducto}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default DatosPedido;