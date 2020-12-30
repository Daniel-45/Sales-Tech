import React from 'react';
import { withRouter } from 'react-router-dom';

// Mutation
import { Mutation } from 'react-apollo';
import { NUEVO_PEDIDO } from './../../mutations'

const validarPedido = (props) => {
    let noValido = !props.productos || props.total <= 0

    return noValido;
}

const GenerarPedido = (props) => {

    // console.log(props);

    return (
        <Mutation 
            mutation={NUEVO_PEDIDO}
            onCompleted={ () => props.history.push('/clientes')}
        >
           {nuevoPedido => (
                <button
                    disabled={validarPedido(props)}
                    type="button"
                    className="btn btn-primary mt-4"
                    onClick={e => {
                        // console.log(props.productos);

                        // Quitar campos nombre, precio, stock
                        // Limpiar el state y dejar solo cantidad y id
                        // Son los campos que requiere PedidoInput
                        const productosInput = props.productos.map((
                            {nombre, precio, stock, ...objeto}) => objeto);

                        // console.log(productosInput);

                        const input = {
                            pedido: productosInput, // Pasar al pedido id y cantidad
                            total: props.total,
                            // La fecha se crea automáticamente en los resolvers
                            cliente: props.idCliente, // id del cliente
                            comercial: props.idComercial // id usuario/comercial
                        }

                        // console.log(input);

                        nuevoPedido({
                            variables: {input}
                        })
                    }}
                >
                Generar Pedido
                </button>
           )}
        </Mutation>
    );
}

export default withRouter(GenerarPedido);