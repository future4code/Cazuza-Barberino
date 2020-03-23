import React, { Component } from "react";
import InputAnimated from "../InputAnimated";
import SelectAnimated from "../SelectAnimated";
import styled from "styled-components";

export default class ThirdPhase extends Component {
  render() {
    const {
      cursoComplementar,
      question,
      onChangeHandler,
      showError
    } = this.props;

    return (
      <Container>
        <label htmlFor="question">
          Por que você não terminou um curso de graduação?
        </label>
        <InputAnimated
          value={question}
          name="question"
          changeHandler={onChangeHandler}
          showError={showError}
        />
        <label htmlFor="curso">Você fez algum curso complementar?</label>
        <SelectAnimated
          name="curso"
          onChange={onChangeHandler}
          value={cursoComplementar}
        >
          <option value={0}>Curso técnico</option>
          <option value={1}>Curso de inglês</option>
          <option value={2}>Não fiz curso complementar</option>
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
