import React, { Component } from "react";
import InputAnimated from "../InputAnimated";
import SelectAnimated from "../SelectAnimated";
import styled from "styled-components";

export default class FirstPhase extends Component {
  render() {
    const {
      name,
      age,
      email,
      schooling,
      onChangeHandler,
      showError
    } = this.props;

    return (
      <Container>
        <InputAnimated
          value={name}
          displayName="Nome"
          name="name"
          changeHandler={onChangeHandler}
          showError={showError}
        />
        <InputAnimated
          value={age}
          displayName="Idade"
          name="age"
          changeHandler={onChangeHandler}
          numberInput={true}
          showError={showError}
        />
        <InputAnimated
          value={email}
          displayName="Email"
          name="email"
          changeHandler={onChangeHandler}
          showError={showError}
        />
        <SelectAnimated
          name="schooling"
          onChange={onChangeHandler}
          value={schooling}
        >
          <option value={0}>Ensino Médio Incompleto</option>
          <option value={1}>Ensino Médio Completo</option>
          <option value={2}>Ensino Superior Incompleto</option>
          <option value={3}>Ensino Superior Completo</option>
        </SelectAnimated>
      </Container>
    );
  }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px;
  row-gap: 10px;
`;
