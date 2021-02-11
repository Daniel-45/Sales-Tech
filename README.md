# SalesTech

Aplicación creada con Node.js, Espress.js, Mongoose, GraphQL, Apollo, JWT, React, JavaScript y Visual Studio Code.

## Descripción

SalesTech es una aplicación web que permite gestionar de manera sencilla y eficaz las ventas, productos, vendedores y clientes de una empresa. Tener un control de inventario de los productos en el almacén y estadísticas manteniendo un histórico detallado de los mejores vendedores y clientes de la empresa en tiempo real, con el objetivo final de mejorar el proceso de venta, el servicio y las relaciones con sus clientes.

## Usuarios para probar la aplicación

**usuario administrador**

usuario: administrador

contraseña: administrador

**usuario (comercial/vendedor)**

usuario: oscar

contraseña: usertar

## Requisitos

Es necesario tener instalado:

* Cualquier editor como [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/), [VSCode](https://code.visualstudio.com/), o cualquier otro editor/IDE que nos guste.
* [NodeJS](https://nodejs.org/es/) en su [última versión](https://nodejs.org/es/download/).

| Dependencias | Version  |
|:-------------|:---------| 
| __node__     | >= 9.3.0 |
| __npm__      | >= 5.5.1 |

## Tecnologías utilizadas

Las herramientas y tecnologías utilizadas para el desarrollo de esta aplicación son:

* NodeJS
* Express
* Mongoose
* GraphQL
* Apollo
* MongoDB
* JWT (JSON Web Token)
* Nodemailer
* React
* HTML
* CSS
* JavaScript
* Bootstrap
* Reacharts
* Visual Studio Code

## Desarrollo

En el directorio **server** del proyecto, ejecutar el comando: `npm install`

### Iniciar el servidor

En el directorio del proyecto **server** ejecutar el comando: `npm start`

Ejecuta los comandos definidos en la sección de scripts del archivo **package.json**, toma la configuración de **babel**,  ejecuta **nodemon** cargando el fichero **index.js** 

### Iniciar la aplicación React

En el directorio del proyecto **client** ejecutar el comando: `npm start`

Iniciar el servidor en modo de desarrollo.

[http://localhost:3000](http://localhost:3000) para ver en el navegador.

## Funcionalidades del producto

El sistema será un producto diseñado para trabajar en entornos Web.

A continuación se muestran las funciones que conforman la aplicación, según el tipo de usuario
que esté utilizando la aplicación.

**Usuario administrador**

**Autenticación**

El usuario administrador deberá autenticarse con su nombre de usuario y su contraseña para acceder al sistema. En caso de no ser correctos alguno de ellos o los dos se mostrará una alerta indicando que el nombre de usuario y/o contraseña no son correctos.

**Administración de usuarios**

El usuario administrador del sistema podrá gestionar los usuarios del sistema (comerciales/vendedores). Podrá añadir, modificar, eliminar y listar usuarios.

**Administración de productos**

El usuario administrador del sistema podrá gestionar los clientes de la empresa. Podrá añadir, modificar, eliminar, listar clientes. También podrá realizar, completar y cancelar pedidos.

**Envío de emails**

El usuario administrador podrá enviar emails a los clientes con promociones específicas basándose en las estadísticas generadas por el sistema en función de los productos más demandados por estos clientes.

**Cerrar sesión**

Se muestra un botón en el menú de navegación para cerrar su sesión. Cuando se pulsa este botón se le redirige a la pantalla de login.

**Usuario  registrado (comercial/vendedor)**

**Autenticación**

El usuario registrado previamente por el administrador del sistema deberá autenticarse con su nombre de usuario y su contraseña para acceder al sistema. En caso de no ser correctos alguno de ellos o los dos se mostrará una alerta indicando que el nombre de usuario y/o contraseña no son correctos.

**Administración de productos**

El usuario registrado en el sistema podrá añadir, modificar, eliminar y listar productos.

**Administración de clientes**

El usuario registrado en el sistema podrá gestionar los clientes de la empresa. Podrá añadir, modificar, eliminar, listar clientes. También podrá realizar, completar y cancelar pedidos.

**Envío de emails**

El usuario registrado podrá enviar emails a los clientes con promociones específicas basándose en las estadísticas generadas por el sistema en función de los productos más demandados por estos clientes.

**Cerrar sesión**

Se muestra un botón en el menú de navegación para cerrar su sesión. Cuando se pulsa este botón se le redirige a la pantalla de login.

**Generación de gráficos**

Otra funcionalidad del producto que no tiene que ver con el tipo de usuario que esté utilizando la aplicación, será la de generar gráficos con los mejores clientes y vendedores de la empresa en función de la suma total de los pedidos en el caso de los clientes y de la suma total de las ventas en el caso de los comerciales/vendedores. 

Esto tiene como objetivo conocer a los mejores clientes de la empresa y así poder ofrecerles promociones especiales con el fin de mejorar la relación con estos clientes y su fidelización. También conocer quienes son los mejores comerciales/vendedores de la empresa.

**Clases y características de usuarios**

**Administrador**

Este rol representa a la persona o personas que se encargarán de la administración general, mantenimiento y funcionamiento de la aplicación.

El usuario administrador es el usuario con más privilegios del sistema. Tiene acceso a todas las opciones del sistema. Puede dar de alta, modificar o eliminar usuarios y/o clientes, productos y pedidos. 

Podrá acceder al listado de todos los clientes de la empresa.

**Usuario**

Este rol representa a los usuarios del sistema (comerciales/vendedores) que están registrados en el sistema cuando el administrador les ha dado de alta.

Los usuarios podrán dar de alta, modificar o eliminar productos, pedidos y clientes. Solo podrán modificar o eliminar los clientes que hayan dado de alta. 

Los usuarios podrán acceder al listado de los clientes que hayan dado de alta, pero solo a los clientes que haya dado de alta cada usuario, no podrán acceder al listado de clientes de otros usuarios.

## Licencia

__GNU GENERAL PUBLIC LICENSE__, si desea saber más, visite el fichero LICENSE


