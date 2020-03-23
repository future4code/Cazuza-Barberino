import React from "react";
import FirstPhase from "./Components/Phases/FirstPhase";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SecondPhase from "./Components/Phases/SecondPhase";
import ThirdPhase from "./Components/Phases/ThirdPhase";

library.add(faChevronRight, faChevronLeft);

class App extends React.Component {
  state = {
    phase: 0,
    showerror: false,
    //first Phase
    name: "",
    age: "",
    email: "",
    schooling: 0,
    //Second Phase
    curso: "",
    unidade: "",
    //Third Phase
    question: "",
    cursoComplementar: 0
  };

  nextPhase = increment => {
    if (increment && this.checkFields()) {
      alert("Você deve preencher todas as perguntas antes de continuar");
      this.setState({
        showerror: true
      });
      return;
    }
    const next = this.state.phase + (increment ? 1 : -1);
    this.setState({
      phase: next,
      showerror: false
    });
  };

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  checkFields = () => {
    const { name, age, email, curso, unidade, question } = this.state;
    switch (this.state.phase) {
      case 0:
        return name === "" || age === "" || email === "";
      case 1:
        return this.state.schooling % 2 != 0
          ? curso === "" || unidade === ""
          : question === "";
    }
  };

  render() {
    let fase = null;

    switch (this.state.phase) {
      case 0:
        fase = (
          <FirstPhase
            name={this.state.name}
            age={this.state.age}
            email={this.state.email}
            schooling={this.state.schooling}
            onChangeHandler={this.onChangeHandler}
            showError={this.state.showerror}
          />
        );
        break;
      case 1:
        fase =
          this.state.schooling % 2 != 0 ? (
            <SecondPhase
              curso={this.state.curso}
              unidade={this.state.unidade}
              onChangeHandler={this.onChangeHandler}
              showError={this.state.showerror}
            />
          ) : (
            <ThirdPhase
              question={this.state.question}
              cursoComplementar={this.state.cursoComplementar}
              onChangeHandler={this.onChangeHandler}
              showError={this.state.showerror}
            />
          );
        break;
      default:
        fase = <h1>Obrigado!</h1>;
        break;
    }

    return (
      <Conainer>
        {fase}
        <Wrapper>
          <Button
            onClick={() => this.nextPhase(false)}
            disabled={this.state.phase === 0}
          >
            <FontAwesomeIcon icon="chevron-left" size="2x" />
          </Button>
          <Button
            onClick={() => this.nextPhase(true)}
            disabled={this.state.phase > 1}
          >
            <FontAwesomeIcon icon="chevron-right" size="2x" />
          </Button>
        </Wrapper>
      </Conainer>
    );
  }
}

export default App;

const Conainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 50px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;
