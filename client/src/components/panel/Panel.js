import React, { Fragment } from 'react';

// Componentes
import Clientes from './Clientes';
import Comerciales from './Comerciales';

const Panel = () => {
    return (
        <Fragment>
            <h2 className="text-center my-4">
                MEJORES CLIENTES Y COMERCIALES
            </h2>
            <hr/>

            <div className="panel">
                <div>
                    <h2 className="text-center my-5">CLIENTES</h2>
                    <Clientes />
                </div>

                <div>
                    <h2 className="text-center my-5">COMERCIALES</h2>
                    <Comerciales />
                </div>
            </div>
        </Fragment>
    );
}

export default Panel;