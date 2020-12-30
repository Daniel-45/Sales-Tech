import React, { Component } from 'react';

class Paginador extends Component {

    state = { 
        paginador: {
            // La propiedad total viene del paginador en el componente Clientes
            // La propiedad limite viene del componente Clientes
            // Total de páginas (Math.ceil para redondear hacia arriba)
            paginas: Math.ceil(Number(this.props.total) / this.props.limite)
        }
     }

    render() { 

        // Página actual
        // Componente Paginador en Clientes (propiedad del objeto) en el state
        const { actual } = this.props;

        // Mostrar el botón de anterior si la página actual es mayor a 1
        const btnAnterior = (actual > 1) 
        ? 
        <button 
        type="button"
        className="btn-paginate mr-1"
        onClick={this.props.paginaAnterior}
        >
            <i className="fas fa-backward"></i> Anterior
        </button>
        : '';

        const { paginas } = this.state.paginador;
        
        // Mostrar el botón de siguiente
        // En todas las páginas excepto en la última
        const btnSiguiente = (actual !== paginas)
        ? 
        <button 
        type="button"
        className="btn-paginate"
        onClick={this.props.paginaSiguiente}
        >
            Siguiente <i className="fas fa-forward"></i>
        </button>
        : '';

        return ( 
            <div className="mt-4 mb-4 d-flex justify-content-end">
                {btnAnterior}
                {btnSiguiente}
            </div>
         );
    }
}
 
export default Paginador;