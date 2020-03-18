import React from "react";
import "./IconeComContador.css";

export function IconeComContador(props) {
  return (
    <div className={"icon-container"}>
      <img alt={"Icone"} src={props.icone} onClick={props.onClickIcone} />
      {props.contador ? <p>{props.valorContador}</p> : null}
    </div>
  );
}
