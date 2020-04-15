import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { TodoData } from "../Store/TodoReducer";
import { FiX, FiCheckCircle, FiCircle } from "react-icons/fi";
import { toggleTodo, deleteTodo } from "../Store/TodoReducer";
import { Button, Box, Grow } from "@material-ui/core";

interface Props {
  todo: TodoData;
}

function Todo({ todo }: Props) {
  const dispatch = useDispatch();

  return (
    <Grow in={true}>
      <Box
        component="li"
        display="flex"
        boxShadow={3}
        padding="10px 20px"
        margin="2px 0"
        fontSize="20px"
        bgcolor="white"
        borderRadius="5px"
      >
        <Button
          disableElevation
          variant="text"
          onClick={() => dispatch(toggleTodo(todo.id))}
        >
          {todo.done ? <FiCheckCircle /> : <FiCircle />}
        </Button>
        <TodoText done={todo.done}>{todo.text}</TodoText>
        <Button
          disableElevation
          variant="contained"
          onClick={() => dispatch(deleteTodo(todo.id))}
        >
          <FiX />
        </Button>
      </Box>
    </Grow>
  );
}

export default Todo;

interface TodoTextProps {
  done: boolean | undefined;
}

const TodoText = styled.p<TodoTextProps>`
  flex: 1;
  margin-left: 20px;
  transition: .2s;
  text-decoration: ${(props) => (props.done ? "line-through" : "none")};
  opacity: ${(props) => (props.done ? 0.5 : 1)};
`;
