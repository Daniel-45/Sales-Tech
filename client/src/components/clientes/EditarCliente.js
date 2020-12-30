import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';

// Componentes
import FormularioEditarCliente from './FormularioEditarCliente';

// Consultas
import { CLIENTE_QUERY } from  './../../queries';

class EditarCliente extends Component {
    state = {}
    render() {

        // Obtener ID del cliente a actualizar
        const { id } = this.props.match.params;
        // console.log(id);

        return (
            <Fragment>
                <div className="col-md-8 col-lg-7 sm-12 mt-4 m-auto">
                    <h2 className="text-center">EDITAR CLIENTE</h2>
                    <hr/>
                </div>
                <Query query={CLIENTE_QUERY} variables={{id}}>
                    {/* Función refetch para refrescar caché de Apollo */}
                    {/* Al llamar a refetch vuelve a realizar la consulta */}
                   {({ loading, error, data, refetch }) => {
                       if (loading) return 'Cargando...';
                       if (error) return  `Error: ${error.message}`
                       // console.log(data);
                       // console.log(this.props);
                       return (
                           <FormularioEditarCliente
                                // Pasar por props los datos que retorna el método getCliente
                                cliente={data.getCliente}
                                refetch={refetch}
                           />
                       )
                   }} 
                </Query>
            </Fragment>
        );
    }
}

export default EditarCliente;