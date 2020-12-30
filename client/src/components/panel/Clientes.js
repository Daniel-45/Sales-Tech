import React from 'react';

// Query
import { Query } from 'react-apollo';
import { TOP_CLIENTES } from './../../queries';

// Gráficos
// Librería Recharts - SimpleBarChart
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


const Clientes = () => {
    return (
        <Query query={TOP_CLIENTES} pollInterval={1000}>
            {({ loading, error, data, startPolling, stopPolling }) => {
                if (loading) return 'Cargando...';
                if (error) return `Error: ${error.message}`;

                // console.log(data); // Respuesta

                const topClientesGrafico = [];

                // Se le pasa el index para el índice del pedido
                data.topClientes.map((pedido, index) => (
                    topClientesGrafico[index] = {
                        ...pedido.cliente[0],
                        total: pedido.total
                    }
                ))

                // console.log(topClientesGrafico);

                return (
                    <div className="d-flex justify-content-center">
                        <BarChart
                            width={800} height={350}
                            data={topClientesGrafico}
                            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nombre" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#007bff" />
                        </BarChart>
                    </div>
                )
            }}
        </Query>
    );
}

export default Clientes;