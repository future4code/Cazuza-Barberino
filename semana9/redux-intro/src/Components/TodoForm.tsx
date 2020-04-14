import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTodo } from "../Store/TodoReducer";
import { TextField } from "@material-ui/core";

function TodoForm() {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <Container onSubmit={handleSubmit}>
      <TextField
        fullWidth={true}
        variant="outlined"
        value={input}
        placeholder="O que tem que ser feito?"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInput(e.target.value);
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
