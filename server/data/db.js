import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Crear la conexión
mongoose.Promise = global.Promise;

mongoose.connect(
    'mongodb+srv://daniel:salestech-password@dam.f2ssz.mongodb.net/proyecto',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

// Definir como va a ser la base de datos
// Definir Schema de clientes
const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    edad: Number,
    tipo: String,
    telefono: String,
    movil: String,
    emails: Array,
    empresa: String,
    cif: String,
    pedidos: Array,
    // id del comercial que da de alta el cliente relación usuarios/clientes
    comercial: mongoose.Types.ObjectId
});

// Crear modelo
const Clientes = mongoose.model('clientes', clientesSchema);

// Definir Schema de productos
const productosSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number
});

const Productos = mongoose.model('productos', productosSchema);

// Definir Schema de pedidos
const pedidosSchema = new mongoose.Schema({
    pedido: Array, // Tiene el id del producto y la cantidad
    total: Number,
    fecha: Date,
    cliente: mongoose.Types.ObjectId, // id del cliente, relación pedidos/clientes
    estado: String,
    comercial: mongoose.Types.ObjectId // id del comercial, relación pedidos/usuarios
});

const Pedidos = mongoose.model('pedidos', pedidosSchema);

// Definir Schema de usuarios
const usuariosSchema = new mongoose.Schema({
    usuario: String,
    nombre: String,
    email: String,
    password: String,
    repetirPassword: String,
    rol: String
});

// Hash password antes de guardar en base de datos
usuariosSchema.pre('save', function (next) {
    // Si el password está encriptado ejecuta ir a la siguiente función
    if (!this.isModified('password')) {
        return next();
    }

    // En caso contrario aplica bcrypt
    // Parámetros:
    // 1. Cuántas veces va a hashear la contraseña
    // 2. Callback en caso de que se genere un error o se genere el salt.
    bcrypt.genSalt(10, (error, salt) => {
        if (error) return next(error);
        // Parámetros:
        // 1. La contraseña a almacenar en base de datos
        // 2. El salt
        // 3. Callback en caso de que exista un error o los datos del hash
        bcrypt.hash(this.password, salt, (error, hash) => {
            if (error) return next(error);
            this.password = hash;
            next();
        });
    });
});


usuariosSchema.pre('findOneAndUpdate', function (next) {
    const usuario = this.getUpdate().$set;
    if (!usuario.password) {
        next();
    }
    else {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) {
                return next(error);
            }
            bcrypt.hash(usuario.password, salt, (error, hash) => {
                if (error) {
                    return next(error);
                }
                usuario.password = hash;
                next();
            });
        });
    }
});


const Usuarios = mongoose.model('usuarios', usuariosSchema);

export { Clientes, Productos, Pedidos, Usuarios };
