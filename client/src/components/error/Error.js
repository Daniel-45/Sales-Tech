import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Error = () => {

    const url = window.location.href;

    // console.log(url);

    return (
        <Fragment>
            <div className="col-lg-8 col-md-6 col-sm-12 m-auto">
                <h1 className="text-center text-white rounded bg-danger p-2 my-4">
                    <span className="font-weight-bold">Error 404</span> página no encontrada.
                </h1>
                <hr/>
                <p>Lo sentimos, pero la URL <span className="font-weight-bold">{url}</span> de la solicitud no se encontró.</p>
                <p>
                    Por favor verifique la dirección introducida e inténtelo de nuevo o <Link to="/panel">vuelva a la página de inicio</Link>
                </p>
                <h3>Otras opciones:</h3>
                <ul>
                    <li>
                        Ponerse en contacto con soporte por email <span className="font-weight-bold">salestech.support@gmail.com</span>
                    </li>
                    <li>
                        Ponerse en contacto con soporte a través de nuestra línea telefónica <span className="font-weight-bold">902 045 876</span>
                    </li>
                </ul>
                <p className="font-weight-bold">
                    Posibles motivos por los que la página solicitada no se encuentre disponible:
            </p>
                <ul>
                    <li>Puede que haya cambiado la URL o no existir</li>
                    <li>Es posible que no haya escrito correctamente la URL, por favor compruébela de nuevo para ver si es correcta</li>
                </ul>
            </div>
        </Fragment>
    );
}

export default Error;