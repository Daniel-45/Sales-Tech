import React from 'react';

// Query
import { Query } from 'react-apollo';
import { TOP_COMERCIALES } from './../../queries';

// Gráficos
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


const Comerciales = () => {
    return (
        <Query query={TOP_COMERCIALES} pollInterval={1000}>
            {({ loading, error, data, startPolling, stopPolling }) => {
                if (loading) return 'Cargando...';
                if (error) return `Error: ${error.message}`;

                // console.log(data);

                const topComercialesGrafico = [];

                data.topComerciales.map((comercial, index) => (
                    topComercialesGrafico[index] = {
                        ...comercial.comercial[0],
                        total: comercial.total
                    }
                ))

                // console.log(topClientesGrafico);

                return (
                    <div className="d-flex comerciales justify-content-center">
                        <BarChart
                            width={800} height={350}
                            data={topComercialesGrafico}
                            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nombre" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#28a745" />
                        </BarChart>
                    </div>
                )
            }}
        </Query>
    );
}

export default Comerciales;