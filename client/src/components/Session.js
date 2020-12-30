import React from 'react';
import { Query } from 'react-apollo';
import { USUARIO_ACTUAL} from './../queries';

// Se le van a pasar muchos componentes 
const Session = Component => props => (
    <Query query={USUARIO_ACTUAL}>
        {({loading, error, data, refetch}) => {
            if (loading) return null;
            // props para cada uno de los componentes
            // En cada uno de los componentes se va a saber el usuario actual
            // session={data} respuesta del servidor del usuario actual
            return <Component {...props} refetch={refetch} session={data} />
        }}
    </Query>
)
 
export default Session;