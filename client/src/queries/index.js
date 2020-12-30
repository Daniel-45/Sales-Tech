import gql from 'graphql-tag';

// Listado de todos los clientes
export const CLIENTES_QUERY = gql`
    query getClientes($limit: Int, $offset: Int, $comercial: String) {
    getClientes(limit: $limit, offset: $offset, comercial: $comercial) {
        id
        nombre
        apellidos
        empresa
    }
    totalClientes(comercial: $comercial)
}`;

// Obtener cliente por su id
export const CLIENTE_QUERY = gql`
    query getCliente($id:ID!) {
        getCliente(id: $id) {
            id
            nombre
            apellidos
            edad
            tipo
            telefono
            movil
            emails {
                email
            }
            empresa
            cif
        }
    }
`;

// Listado de productos
export const PRODUCTOS_QUERY = gql`
    query getProductos($limit: Int, $offset: Int, $stock: Boolean) {
        getProductos(limit: $limit, offset: $offset, stock: $stock) {
            id
            nombre
            precio
            stock
        }
        totalProductos
    }
`;

// Obtener producto por su id
export const PRODUCTO_QUERY = gql`
    query getProducto($id: ID!) {
        getProducto(id: $id) {
            nombre
            precio
            stock
        }
    }
`;

// Obtener listado de pedidos
export const PEDIDOS_QUERY = gql`
    query getPedidos($cliente: ID) {
        getPedidos(cliente: $cliente) {
            id
            total
            fecha
            estado
            pedido {
                id
                cantidad
            }
        }
    }
`;

// Gráficos
export const TOP_CLIENTES = gql`
    query topClientes {
        topClientes {
            total
            cliente {
                nombre
            }
        }
    }
`;

export const TOP_COMERCIALES = gql`
    query topComerciales {
        topComerciales {
            total
            comercial {
                nombre
            }
        }
    }
`;

// Usuarios
export const USUARIO_ACTUAL = gql`
    query getUsuario {
        getUsuario {
            id
            usuario
            nombre
            email
            rol
        }
    }
`;

export const USUARIO_QUERY = gql`
    query obtenerUsuario($id: ID!) {
        obtenerUsuario(id: $id) {
            id
            usuario
            nombre
            password
            email
            rol
        }
    }
`;

export const USUARIOS_QUERY = gql`
    query getUsuarios($limit: Int, $offset: Int) {
        getUsuarios(limit: $limit, offset: $offset) {
            id
            usuario
            nombre
            email
            rol
        }
        totalUsuarios
    }
`;