import React, { Component } from "react";
import InputAnimated from "../InputAnimated";
import styled from "styled-components";

export default class SecondPhase extends Component {
  render() {
    const { curso, unidade, onChangeHandler, showError } = this.props;

    return (
      <Container>
        <InputAnimated
          value={curso}
          displayName="Qual o curso?"
          name="curso"
          changeHandler={onChangeHandler}
          showError={showError}
        />
        <InputAnimated
          value={unidade}
          displayName="Qual a unidade de ensino?"
          name="unidade"
          changeHandler={onChangeHandler}
          showError={showError}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px;
  row-gap: 10px;
`;
