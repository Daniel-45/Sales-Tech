import mongoose from 'mongoose';
import { Clientes, Productos, Pedidos, Usuarios } from './db';
import { rejects } from 'assert';
import bcrypt from 'bcrypt';

// Generar Token
// Permite importar el fichero variables.env en este fichero
import dotenv from 'dotenv';

dotenv.config({ path: 'variables.env' });

import jwt from 'jsonwebtoken'; // Para generar el Token

// Parámetros:
// 1. Usuario del que se va a generar el token
// 2. Clave secreta (variables.env)
// 3. Tiempo de expiración
const crearToken = (usuarioLogin, secreto, expiresIn) => {
    const { usuario } = usuarioLogin;

    // JWT firmado
    return jwt.sign({ usuario }, secreto, { expiresIn });
}

// Variable para convertir un String a un ObjectId
const ObjectId = mongoose.Types.ObjectId;

// Resolver - Respuesta del servidor
// Los resolvers son funciones que realizan las interacciones con el Sqhema de GraphQL
export const resolvers = {
    Query: {
        getClientes: (global, { limit, offset, comercial }) => {
            // Limit y skip para paginar los resultados
            let filtro;
            if (comercial) {
                // Convertir un String a un ObjectId
                filtro = { comercial: new ObjectId(comercial) }
                // console.log(filtro);
                return Clientes.find(filtro).sort({ nombre: 1 }).limit(limit).skip(offset);
            }

            return Clientes.find({}).sort({ nombre: 1 }).limit(limit).skip(offset);
        },
        getCliente: (global, { id }) => {
            return new Promise((resolve, object) => {
                Clientes.findById(id, (error, cliente) => {
                    if (error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
        totalClientes: (global, { comercial }) => {
            return new Promise((resolve, object) => {
                let filtro;
                if (comercial) {
                    // Convertir un String a un ObjectId
                    filtro = { comercial: new ObjectId(comercial) }

                }
                Clientes.countDocuments(filtro, (error, count) => {
                    if (error) rejects(error)
                    else resolve(count)
                });
            });
        },
        getProductos: (global, { limit, offset, stock }) => {
            let filtro;
            // Al pasar stock como true añade el filtro
            if (stock) {
                filtro = { stock: { $gt: 0 } }
            }
            // Traer los productos cuyo stock se mayor a cero
            return Productos.find(filtro).sort({ precio: -1 }).limit(limit).skip(offset);
        },
        getProducto: (global, { id }) => {
            return new Promise((resolve, object) => {
                Productos.findById(id, (error, producto) => {
                    if (error) rejects(error)
                    else resolve(producto)
                });
            });
        },
        totalProductos: (global) => {
            return new Promise((resolve, object) => {
                Productos.countDocuments((error, count) => {
                    if (error) rejects(error)
                    else resolve(count)
                });
            });
        },
        getPedidos: (global, { cliente }) => {
            return new Promise((resolve, object) => {
                // cliente -> id del cliente
                Pedidos.find({ cliente: cliente }, (error, pedido) => {
                    if (error) rejects(error)
                    else resolve(pedido)
                })
            })
        },
        topClientes: (global) => {
            return new Promise((resolve, object) => {
                // Join Pedidos - Clientes
                Pedidos.aggregate([
                    {
                        // Pedidos con estado completado
                        $match: { estado: "COMPLETADO" }
                    },
                    {
                        // Agrupar los registros
                        $group: {
                            _id: "$cliente", // Varios clientes
                            total: { $sum: "$total" }
                        }
                    },
                    {
                        $lookup: {
                            from: "clientes", // Colección de donde traer registros
                            localField: "_id",
                            foreignField: "_id",
                            as: "cliente"
                        }
                    },
                    {
                        // Ordenar forma descendente por total compras
                        $sort: { total: -1 }
                    },
                    {
                        $limit: 10
                    }
                ], (error, resultado) => {
                    if (error) rejects(error)
                    else resolve(resultado)
                })
            })
        },
        topComerciales: (global) => {
            return new Promise((resolve, object) => {
                Pedidos.aggregate([
                    {
                        // Pedidos con estado completado
                        $match: { estado: "COMPLETADO" }
                    },
                    {
                        // Agrupar los registros
                        $group: {
                            _id: "$comercial", // Varios usuarios/comerciales
                            total: { $sum: "$total" }
                        }
                    },
                    {
                        $lookup: {
                            from: "usuarios", // Colección de donde traer registros
                            localField: "_id",
                            foreignField: "_id",
                            as: "comercial"
                        }
                    },
                    {
                        // Ordenar forma descendente por total ventas
                        $sort: { total: -1 }
                    },
                    {
                        $limit: 10
                    }
                ], (error, resultado) => {
                    if (error) rejects(error)
                    else resolve(resultado)
                })
            })
        },
        getUsuarios: (global, { limit, offset }) => {
            return Usuarios.find({}).sort({ usuario: 1 }).limit(limit).skip(offset);
        },
        totalUsuarios: (global) => {
            return new Promise((resolve, object) => {
                Usuarios.countDocuments((error, count) => {
                    if (error) rejects(error)
                    else resolve(count)
                });
            });
        },
        obtenerUsuario: (global, { id }) => {
            return new Promise((resolve, object) => {
                Usuarios.findById(id, (error, usuario) => {
                    if (error) rejects(error)
                    else resolve(usuario)
                });
            });
        },
        // usuarioActual en el index.js al verificar el token forma parte de request
        // Para saber de que usuario se ha validado y verificado el token
        getUsuario: (global, args, { usuarioActual }) => {
            if (!usuarioActual) {
                return null;
            }

            // Terminal
            // console.log(usuarioActual);

            // Obtener el usuario actual de la request del JWT verificado
            const usuario = Usuarios.findOne({ usuario: usuarioActual.usuario });

            return usuario;
        }
    },
    Mutation: {
        insertarCliente: async (global, { input }) => {

            const nuevoCliente = new Clientes({
                nombre: input.nombre,
                apellidos: input.apellidos,
                edad: input.edad,
                tipo: input.tipo,
                telefono: input.telefono,
                movil: input.movil,
                emails: input.emails,
                empresa: input.empresa,
                cif: input.cif,
                pedidos: input.pedidos,
                comercial: input.comercial
            });
            // MongoDB crea el id que se asigna al objeto
            nuevoCliente.id = nuevoCliente._id;

            return new Promise((resolve, object) => {
                nuevoCliente.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoCliente)
                });
            });
        },
        actualizarCliente: (global, { input }) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, cliente) => {
                    if (error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
        eliminarCliente: (global, { id }) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndDelete({ _id: id }, (error) => {
                    if (error) rejects(error)
                    else resolve('Cliente eliminado correctamente')
                });
            });
        },
        insertarProducto: (global, { input }) => {
            const nuevoProducto = new Productos({
                nombre: input.nombre,
                precio: input.precio,
                stock: input.stock
            });
            // MongoDB crea el id que se asigna al objeto
            nuevoProducto.id = nuevoProducto._id;

            return new Promise((resolve, object) => {
                nuevoProducto.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoProducto)
                })
            });
        },
        actualizarProducto: (global, { input }) => {
            return new Promise((resolve, object) => {
                Productos.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, producto) => {
                    if (error) rejects(error)
                    else resolve(producto)
                });
            });
        },
        eliminarProducto: (global, { id }) => {
            return new Promise((resolve, object) => {
                Productos.findOneAndDelete({ _id: id }, (error) => {
                    if (error) rejects(error)
                    else resolve('Producto eliminado correctamente')
                });
            });
        },
        nuevoPedido: (global, { input }) => {
            const nuevoPedido = new Pedidos({
                pedido: input.pedido,
                total: input.total,
                fecha: new Date(),
                cliente: input.cliente, // Referencia a cliente
                estado: 'PENDIENTE', // Por defecto pendiente
                comercial: input.comercial // Referencia al usuario/comercial
            });

            nuevoPedido.id = nuevoPedido._id;

            return new Promise((resolve, object) => {
                // Guardar pedido en la base de datos
                nuevoPedido.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoPedido)
                });
            });
        },
        actualizarEstadoPedido: (global, { input }) => {
            return new Promise((resolve, object) => {
                // El fichero .babelrc 
                // Permite escribir en los resolvers código de última generación de JavaScript

                // En la terminal
                //console.log(input);  

                const { estado } = input;

                let operacion;

                if (estado === 'COMPLETADO') {
                    operacion = '-'
                } else if (estado === 'CANCELADO') {
                    operacion = '+'
                }

                // Recorre y actualizar stock en fucnción del estado del pedido
                input.pedido.forEach(pedido => {
                    Productos.updateOne({ _id: pedido.id },
                        {
                            "$inc": { "stock": `${operacion}${pedido.cantidad}` }
                        }, (error) => {
                            if (error) return new Error(error)
                        }
                    )
                });

                Pedidos.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error) => {
                    if (error) rejects(error)
                    else resolve('Estado actualizado correctamente')
                });

            })
        },
        insertarUsuario: async (global, { usuario, nombre, email, password, repetirPassword, rol }) => {
            // Verificar si un usuario está repetido
            // Esperar hasta que se completa la tarea
            const existeUsuario = await Usuarios.findOne({ usuario });

            // Esperar hasta que se completa la tarea
            const existeEmail = await Usuarios.findOne({ email });

            if (nombre === '' || email === '' || password === '' || repetirPassword === '' || rol === '') {
                throw new Error('Todos los campos son obligatorios');
            }

            if (existeUsuario) {
                throw new Error('Ya existe ese nombre de usuario');
            }

            if (existeEmail) {
                throw new Error('Ya existe un usuario con ese email');
            }

            if (password.length < 6) {
                throw new Error('La contraseña debe tener mínimo 6 caracteres');
            }

            if (password !== repetirPassword) {
                throw new Error('La contraseñas deben ser iguales');
            }

            const nuevoUsuario = new Usuarios({
                usuario: usuario,
                nombre: nombre,
                email: email,
                password: password,
                rol: rol
            });

            // MongoDB crea el id que se asigna al objeto
            nuevoUsuario.id = nuevoUsuario._id;

            return new Promise((resolve, object) => {
                nuevoUsuario.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoUsuario);
                });
            });

            // console.log(nuevoUsuario);
        },
        autenticarUsuario: async (global, { usuario, password }) => {
            const nombreUsuario = await Usuarios.findOne({ usuario });

            if (!nombreUsuario) {
                throw new Error('El nombre de usuario no existe en la base de datos')
            }

            const passwordCorrecto = await bcrypt.compare(password, nombreUsuario.password);

            // Si el password no es correcto
            if (!passwordCorrecto) {
                throw new Error('Usuario y/o contraseña incorrectos')
            }

            return {
                token: crearToken(nombreUsuario, process.env.SECRETO, '8hr')
            }
        },
        eliminarUsuario: (global, { id }) => {
            return new Promise((resolve, object) => {
                Usuarios.findOneAndDelete({ _id: id }, (error) => {
                    if (error) rejects(error)
                    else resolve('Usuario eliminado correctamente')
                });
            });
        },
        actualizarUsuario: (global, { id, usuario, nombre, email, password, rol }) => {
            return new Promise((resolve, object) => {
                Usuarios.findOneAndUpdate({ _id: id }, { $set: { usuario: usuario, nombre: nombre, email: email, password: password, rol: rol } },
                    { new: true }, (error, usuario) => {
                        if (error) rejects(error)
                        else resolve(usuario)
                    });
            });
        },
    }
}

export default resolvers;