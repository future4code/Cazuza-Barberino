import React from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { StateData } from "../Store";
import {
  completeAllTodo,
  deleteCompletedTodo,
  changeFilter,
} from "../Store/TodoReducer";

interface Props {
  totalTodos: number;
  doneTodos: number;
}

function TodoOption({ totalTodos, doneTodos }: Props) {
  const filter = useSelector((state: StateData) => state.todo.filter);
  const dispatch = useDispatch();

  return (
    <Container>
      <Btn
        onClick={() => dispatch(completeAllTodo())}
        show={doneTodos < totalTodos}
      >
        Marcar todas como completas
      </Btn>

      <Select
        value={filter}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          dispatch(changeFilter(e.target.value))
        }
      >
        <option value="all">all</option>
        <option value="done">done</option>
        <option value="undone">undone</option>
      </Select>

      <Btn onClick={() => dispatch(deleteCompletedTodo())} show={doneTodos > 0}>
        Remover completas
      </Btn>
    </Container>
  );
}

export default TodoOption;

interface BtnProps {
  show: boolean;
}

const Select = styled.select`
  flex: 1;
  font-size: 20px;
  padding: 15px 10px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.button<BtnProps>`
  flex: 1;
  border: none;
  padding: 15px 10px;
  font-size: 20px;
  opacity: 1;
  cursor: pointer;
  ${(props) =>
    !props.show &&
    css`
      pointer-events: none;
      opacity: 0;
    `};
`;
