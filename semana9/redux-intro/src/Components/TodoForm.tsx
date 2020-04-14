import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { changeInput } from "../Store/FormReducer";
import { addTodo } from "../Store/TodoReducer";
import { StateData } from "../Store";

function TodoForm() {
  const inputValue = useSelector<StateData, string>(
    (state: StateData) => state.form
  );

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addTodo(inputValue));
    dispatch(changeInput(""));
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Input
        value={inputValue}
        placeholder="O que tem que ser feito?"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          dispatch(changeInput(e.target.value));
        }}
        type="text"
      />
    </Container>
  );
}

export default TodoForm;

const Container = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  font-size: 30px;
  border: none;
  color: ${(props) => props.theme.fc};
`;
