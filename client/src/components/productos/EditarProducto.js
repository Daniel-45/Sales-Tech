import React, { Component, Fragment } from 'react';
import FormularioEditarProducto from './FormularioEditarProducto';

// Query
import { Query } from 'react-apollo';
import { PRODUCTO_QUERY } from './../../queries';

class EditarProducto extends Component {
    state = {  }
    render() { 

        // Obtener el id del producto a editar
        const {id} = this.props.match.params;

        return ( 
            <Fragment>
                <div className="col-md-8 col-lg-7 sm-12 mt-4 m-auto">
                    <h2 className="text-center">EDITAR PRODUCTO</h2>
                    <hr/>
                </div>
                
                <div className="row justify-content-center">
                    <Query query={PRODUCTO_QUERY} variables={{id}}>
                        {({loading, error, data, refetch}) => {
                            if (loading) return 'Cargando...';
                            if (error) return `Error ${error.message}`;
                            
                            return (
                                <FormularioEditarProducto 
                                    id={id}
                                    producto={data} // data contiene getProducto
                                    refetch={refetch}
                                />
                            )
                        }}
                    </Query>
                </div>
            </Fragment>
         );
    }
}
 
export default EditarProducto;