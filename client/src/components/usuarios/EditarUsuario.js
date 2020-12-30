import React, { Component, Fragment } from 'react';

// Query
import { Query } from 'react-apollo';
import { USUARIO_QUERY } from '../../queries';

// Componentes
import FormularioEditarUsuario from './FormularioEditarUsuario';


class EditarUsuario extends Component {
    state = {

    }

    render() {

        // Obtener el id de usuario del usuario a editar
        const { id } = this.props.match.params;
        // console.log(id);

        return (
            <Fragment>
                <div className="col-md-6 col-lg-6 sm-12 mt-4 m-auto">
                    <h2 className="text-center">EDITAR USUARIO</h2>
                    <hr/>
                </div>

                <div className="row justify-content-center">
                    <Query query={USUARIO_QUERY} variables={{ id }}>
                        {({ loading, error, data, refetch }) => {
                            if (loading) return 'Cargando...';
                            if (error) return `Error: ${error.message}`;

                            console.log(data);

                            return (
                                <FormularioEditarUsuario
                                    usuario={data.obtenerUsuario}
                                    refetch={refetch}
                                    id
                                />
                            )
                        }}
                    </Query>
                </div>
            </Fragment>
        );
    }
}

export default EditarUsuario;