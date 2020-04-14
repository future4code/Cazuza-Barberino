import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { TodoData } from "../Store/TodoReducer";
import { FiX } from "react-icons/fi";
import { toggleTodo, deleteTodo } from "../Store/TodoReducer";

interface Props {
  todo: TodoData;
}

function Todo({ todo }: Props) {
  const dispatch = useDispatch();

  return (
    <Li>
      <TodoText done={todo.done} onClick={() => dispatch(toggleTodo(todo.id))}>
        {todo.name}
      </TodoText>
      <CloseBtn onClick={() => dispatch(deleteTodo(todo.id))} />
    </Li>
  );
}

export default Todo;

interface TodoTextProps {
  done: boolean | undefined;
}

const TodoText = styled.p<TodoTextProps>`
  flex: 1;
  text-decoration: ${(props) => (props.done ? "line-through" : "none")};
`;

const Li = styled.li`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
`;

const CloseBtn = styled(FiX)`
  cursor: pointer;
`;
