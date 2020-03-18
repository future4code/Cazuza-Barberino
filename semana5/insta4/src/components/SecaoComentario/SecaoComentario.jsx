import React, { Component } from "react";
import "./SecaoComentario.css";

export class SecaoComentario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coment: ""
    };
  }

  onChangeComentario = event => {
    this.setState({
      coment: event.target.value
    });
  };

  render() {
    return (
      <div className={"comment-container"}>
        <input
          className={"input-comentario"}
          placeholder={"Comentário"}
          value={this.state.coment}
          onChange={this.onChangeComentario}
        />
        <button onClick={() => this.props.aoEnviar(this.state.coment)}>
          Enviar
        </button>
      </div>
    );
  }
}
