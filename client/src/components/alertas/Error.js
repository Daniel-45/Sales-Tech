import React from 'react';

const Error = ({error}) => {

    // Si existe la variable message
    if (error.message) {
        error = error.message;
    }

    return ( 
        <p className="alert alert-danger text-center p-2 mb-4">
            {error}
        </p>
    )
}
 
export default Error;