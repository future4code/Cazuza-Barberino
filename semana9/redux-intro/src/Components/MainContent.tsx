import React from "react";
import TodoForm from "./TodoForm";
import styled from "styled-components";
import TodoOption from "./TodoOption";
import { useSelector } from "react-redux";
import { TodoState } from "../Store/TodoReducer";
import { StateData } from "../Store";
import Todo from "./Todo";

function MainContent() {
  const { todoList, filter } = useSelector<StateData, TodoState>(
    (state: StateData) => state.todo
  );

  let doneTodos = 0;

  const todos = todoList
    .filter(
      (todo) =>
        filter === "all" ||
        (filter === "done" && todo.done) ||
        (filter === "undone" && !todo.done)
    )
    .map((todo) => {
      if (todo.done) doneTodos++;
      return <Todo todo={todo} />;
    });

  return (
    <Container>
      <TodoContainer>
        <Wrapper>
          <TodoForm />
          {todoList.length > 0 && (
            <TodoOption totalTodos={todos.length} doneTodos={doneTodos} />
          )}
          <TodoList>{todos}</TodoList>
        </Wrapper>
      </TodoContainer>
    </Container>
  );
}

export default MainContent;

const Container = styled.div`
  position: relative;
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 50px 0;

  background-color: ${(props) => props.theme.bg};
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TodoList = styled.ul`
  list-style-type: none;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
`;
