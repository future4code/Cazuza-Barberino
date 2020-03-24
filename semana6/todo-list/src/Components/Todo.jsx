import React, { Component, createRef } from "react";
import styled, { css } from "styled-components";

export default class Todo extends Component {
  render() {
    const { name, completed, remove, changeName, toggle } = this.props;

    return (
      <Container>
        <Input
          ref={this.inputRef}
          completed={completed}
          type="text"
          value={name}
          onChange={changeName}
          //   onBlur={() => {
          //     this.setState({ editable: false });
          //   }}
        />
        <ButtonWrapper>
          <EditButton onClick={toggle}>T</EditButton>
          <Button onClick={remove}>X</Button>
        </ButtonWrapper>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 250px;
  display: grid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid black;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 5px 10px;
  margin: 5px;
`;

const Input = styled.input`
  position: relative;
  background-color: transparent;
  border: none;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};

  &:focus {
    border-bottom: 2px solid black;
  }

  &:disabled {
    color: black;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex: none;
`;

const Button = styled.button`
  position: relative;
  background-color: black;
  color: white;
  border: 2px solid black;
  padding: 5px;
  cursor: pointer;
  font-weight: 700;
  transition: 0.2s;

  margin-left: 5px;
  border-radius: 0;

  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const EditButton = styled(Button)`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;
