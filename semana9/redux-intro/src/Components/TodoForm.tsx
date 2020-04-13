import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FormDispatch } from "../Store/FormReducer";

function TodoForm() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const inputValue = useSelector<string, string>((state: string) => state);

  const dispatch = useDispatch();

  const formDispatcher = new FormDispatch(dispatch);

  return (
    <Container onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          formDispatcher.changeInput(e.target.value);
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
