import React, { ChangeEvent, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FormDispatch } from "../Store/FormReducer";
import { TodoDispatcher } from "../Store/TodoReducer";
import { StateData } from "../Store";

function TodoForm() {
  const inputValue = useSelector<StateData, string>(
    (state: StateData) => state.form
  );

  const fDispatch = useDispatch();

  const formDispatcher = useRef(new FormDispatch(fDispatch));
  const todoDispatcher = useRef(new TodoDispatcher(fDispatch));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted");
    todoDispatcher.current.addTodo(inputValue);
    formDispatcher.current.changeInput("");
  };

  return (
    <Container onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          formDispatcher.current.changeInput(e.target.value);
        }}
        type="text"
      />
    </Container>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter,
//   };
// };

export default TodoForm;

const Container = styled.form``;
