import { importSchema } from 'graphql-import'; // Importar schema.graphql

// Types Definitions son los types del fichero schema.graphql
// Aunque esten al mismo nivel hay que indicar 'data/schema.graphql'
const typeDefs = importSchema('data/schema.graphql');

export { typeDefs };

