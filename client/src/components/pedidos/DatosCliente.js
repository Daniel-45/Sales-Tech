import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

// Query
import { CLIENTE_QUERY } from './../../queries';

const DatosCliente = ({ id }) => {
    return (
        <Fragment>
            <h4 className="text-center mt-4">DATOS DEL CLIENTE</h4>

            <Query
                query={CLIENTE_QUERY}
                variables={{ id }}
                pollInterval={500}
            >
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if (loading) return 'Cargando...';
                    if (error) return `Error: ${error.message}`;

                    // console.log(data.getCliente);

                    const { nombre, apellidos, edad, tipo, telefono, movil, emails, empresa, cif } = data.getCliente;

                    return (
                        <div className="card card-body mt-4">
                            <p>
                                <span className="font-weight-bold">Nombre:</span> {nombre}
                            </p>
                            <p>
                                <span className="font-weight-bold">Apellidos:</span> {apellidos}
                            </p>
                            <p>
                                <span className="font-weight-bold">Edad:</span> {edad}
                            </p>
                            <p>
                                <span className="font-weight-bold">Tipo:</span> {tipo}
                            </p>
                            <p>
                                <span className="font-weight-bold">Teléfono: </span>  {telefono}
                            </p>
                            <p>
                                <span className="font-weight-bold">Móvil:</span> {movil}
                            </p>
                            <p>
                                <span className="font-weight-bold">Emails:</span> {emails.map(email => ` ${email.email}`)}
                            </p>
                            <p>
                                <span className="font-weight-bold">Empresa:</span> {empresa}
                            </p>
                            <p>
                                <span className="font-weight-bold">CIF:</span> {cif}
                            </p>
                        </div>
                    )
                }}
            </Query>
        </Fragment>
    );
}

export default DatosCliente;