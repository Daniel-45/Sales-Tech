import React, { Component } from 'react'
import axios from "axios";

class Email extends Component {
  email = React.createRef();
  asunto = React.createRef();
  mensaje = React.createRef();

  state = {
    email: "",
    asunto: "",
    mensaje: ""
  };

  comprobarCambios = () => {
    let email = this.email.current.value;
    let asunto = this.asunto.current.value;
    let mensaje = this.mensaje.current.value;
    this.setState({
      email: email,
      asunto: asunto,
      mensaje: mensaje
    });
  };

  constructor() {
    super();
    this.enviarEmail = this.enviarEmail.bind(this);
  }

  async enviarEmail(e) {
    e.preventDefault();
    const { email, asunto, mensaje } = this.state;
    const sendEmail = await axios.post("/api/send-mail", {
      email,
      asunto,
      mensaje
    });
  }

  render() {
    return (
      <div className="col-md-8 col-lg-7 col-sm-12 m-auto">
        <form className="formulario col-12 mt-5" onSubmit={this.enviarEmail}>
          <div>
            <label htmlFor="email" className="font-weight-bold">Email:</label>
            <input
              type="email"
              name="email"
              onChange={this.comprobarCambios}
              className="form-control mb-2"
              ref={this.email}
            />
          </div>
          <div>
            <label htmlFor="asunto" className="font-weight-bold">Asunto:</label>
            <input
              type="text"
              name="asunto"
              onChange={this.comprobarCambios}
              className="form-control mb-2"
              ref={this.asunto}
            />
          </div>
          <div>
            <label htmlFor="mensaje" className="font-weight-bold">Mensaje:</label>
            <textarea
              rows="4"
              name="mensaje"
              onChange={this.comprobarCambios}
              className="form-control"
              ref={this.mensaje}
            ></textarea>
          </div>
          <br/>
          <div>
            <button type="submit" className="btn btn-primary btn-block">
              Enviar
            </button>
          </div>
        </form>
      </div>
    );
  }

}

export default Email;