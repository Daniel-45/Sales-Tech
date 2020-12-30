import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Componentes
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';
import Productos from './components/productos/Productos'
import NuevoProducto from './components/productos/NuevoProducto';
import EditarProducto from './components/productos/EditarProducto';
import NuevoPedido from './components/pedidos/NuevoPedido';
import PedidosCliente from './components/pedidos/PedidosCliente';
import Panel from './components/panel/Panel';
import Registro from './components/auth/Registro';
import Usuarios from './components/usuarios/Usuarios';
import EditarUsuario from './components/usuarios/EditarUsuario';
import Login from './components/auth/Login';
import Session from './components/Session';
import Email from './components/email/Email';
import Error from './components/error/Error';

const App = ({ refetch, session }) => {

  // console.log(session);

  const { getUsuario } = session;

  // Proteger endpoints
  const mensaje = (getUsuario) ? `Hola, ${getUsuario.nombre}` : <Redirect to="/login" />

  return (
    // Dentro estarán los componentes
    // Utilizar las características de Apollo mutations, query....
    <Router>
      <Fragment>
        <Header session={session} />
        <div className="container col-sm-12 col-md-12 col-lg-10">
          <div className="main">
            <p className="text-right">{mensaje}</p>
            {/* Switch para tener distintos componentes dependiendo de la URL */}
            <Switch>
              <Route exact path="/clientes" render={() => <Clientes session={session} />} />
              <Route exact path="/clientes/nuevo" render={() => <NuevoCliente session={session} />} />
              <Route exact path="/clientes/editar/:id" component={EditarCliente} />
              <Route exact path="/productos" component={Productos} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route exact path="/productos/editar/:id" component={EditarProducto} />
              <Route exact path="/pedidos/nuevo/:id" render={() => <NuevoPedido session={session} />} />
              <Route exact path="/pedidos/:id" component={PedidosCliente} />
              <Route exact path="/registro" render={() => <Registro session={session} />} />
              <Route exact path="/usuarios" render={() => <Usuarios session={session} />} />
              <Route exact path="/usuarios/editar/:id" component={EditarUsuario} />
              <Route exact path="/login" render={() => <Login refetch={refetch} />} />
              <Route exact path="/correo" render={() => <Email refetch={refetch} />} />
              <Route exact path="/panel" component={Panel} />
              <Route component={Error} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Fragment>
    </Router>
  )
}

// Hacer que todos los componentes tengan los datos de la sesión 
const RootSession = Session(App);

export { RootSession }