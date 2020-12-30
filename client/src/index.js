import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RootSession } from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
// Archivo CSS de Bootstrap 4 
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
// Archivo Javascript de Bootstrap 4
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';

// Resolvers, conexiones a Mongo...
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // Enviar Token al servidor
  fetchOptions: {
    credentials: 'include'
  },
  // Verificar que el usuario está autenticado en cada página
  request: operations => {
    // Leer Token de Local Storage
    const token = localStorage.getItem('token');
    // Enviar token al Backend
    // El context se comunica con el backend
    operations.setContext({
      headers: {
        authorization: token
      }
    })
  },
  cache: new InMemoryCache({
    // Solucionar bad request 400 al actualizar un cliente
    // Apollo agrega __Typename
    addTypename: false 
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

ReactDOM.render(
  // Dentro estarán los componentes
  // Utilizar las características de Apollo mutations, query....
  <ApolloProvider client={client}>
    <RootSession />
  </ApolloProvider>,
  document.getElementById('root')
);


serviceWorker.unregister();
