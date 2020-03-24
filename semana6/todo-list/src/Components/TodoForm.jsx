import React, { Component } from "react";
import shortid from "shortid";
import styled from "styled-components";

export default class TodoForm extends Component {
  state = {
    todoInput: ""
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();

    if (this.state.todoInput === "") return;

    const newTodo = {
      name: this.state.todoInput,
      id: shortid.generate(),
      completed: false
    };
    this.setState({
      todoInput: ""
    });

    this.props.onSubmit(newTodo);
  };

  render() {
    return (
      <Form onSubmit={this.submitHandler}>
        <Input
          onChange={this.changeHandler}
          type="text"
          name="todoInput"
          id="todo"
          value={this.state.todoInput}
          placeholder="Task to do..."
        />
        <Button type="submit">Add Task</Button>
      </Form>
    );
  }
}

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  padding: 10px;
`;

const Input = styled.input`
  background-color: white;
  color: black;
  border: 2px solid black;
  padding: 5px 10px;
  border-radius: 10px;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  font-weight: 700;
  border: 2px solid black;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;

  transition: 0.2s;

  &:hover {
    color: black;
    background-color: white;
  }
`;
