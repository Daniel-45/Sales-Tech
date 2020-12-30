import React, { Fragment } from 'react';

const DatosProducto = ({cantidad, producto}) => {

    return (
        <Fragment>
            <div className="border mt-4 mb-4 p-4">
                <p className="card-text font-weight-bold">
                    Nombre:
                    <span className="font-weight-normal"> {producto.nombre}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Cantidad:
                    <span className="font-weight-normal"> {cantidad}</span>
                </p>
                <p className="card-text font-weight-bold">
                    Precio por unidad:
                    <span className="font-weight-normal"> {producto.precio}€</span>
                </p>
            </div>
        </Fragment>
    );
}

export default DatosProducto;