import gql from 'graphql-tag';

// Clientes
export const NUEVO_CLIENTE = gql`
    mutation insertarCliente($input: ClienteInput) {
        insertarCliente(input: $input) {
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

export const ACTUALIZAR_CLIENTE = gql`
    mutation actualizarCliente($input: ClienteInput) {
        actualizarCliente(input: $input) {
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

export const ELIMINAR_CLIENTE = gql`
    mutation eliminarCliente($id: ID!) {
        eliminarCliente(id: $id)
    }
`;

// Productos
export const NUEVO_PRODUCTO = gql`
    mutation insertarProducto($input: ProductoInput) {
        insertarProducto(input: $input) {
            id
            nombre
            precio
            stock
        }
    }
`;

export const ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id: ID!) {
        eliminarProducto(id: $id)
    }
`;

export const ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto($input:ProductoInput) {
        actualizarProducto(input: $input) {
            nombre
            precio
            stock
        }
    }
`;

// Pedidos
export const NUEVO_PEDIDO = gql`
    mutation nuevoPedido($input: PedidoInput) {
        nuevoPedido(input: $input) {
           id
        }
    }
`;

export const ACTUALIZAR_ESTADO = gql`
    mutation actualizarEstadoPedido($input: PedidoInput) {
        actualizarEstadoPedido(input: $input)
    }
`;

// Usuarios
export const NUEVO_USUARIO = gql`
    mutation insertarUsuario($usuario: String!, $nombre: String!, $email: String!, $password: String!, $repetirPassword: String!, $rol: String!) {
        insertarUsuario(usuario: $usuario, nombre: $nombre, email: $email, password: $password, repetirPassword: $repetirPassword, rol: $rol) {
            id
            usuario
            nombre
            email
            password
            rol
        }
    }
`;

export const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($usuario: String!, $password: String!) {
        autenticarUsuario(usuario: $usuario, password: $password) {
            token
        }
    }
`;

export const ACTUALIZAR_USUARIO = gql`
    mutation actualizarUsuario($id: ID, $usuario: String!, $nombre: String!, $email:String!, $password: String!, $rol: String!) {
        actualizarUsuario(id: $id, usuario: $usuario, nombre: $nombre, email: $email, password: $password, rol: $rol) {
            id
            usuario
            nombre
            email
            password
            rol
        }
    }
`;

export const ELIMINAR_USUARIO = gql`
    mutation eliminarUsuario($id:ID!) {
        eliminarUsuario(id: $id)
    }
`;