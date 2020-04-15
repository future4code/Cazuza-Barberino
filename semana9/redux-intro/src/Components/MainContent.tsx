import React from "react";
import TodoForm from "./TodoForm";
import styled from "styled-components";
import TodoOption from "./TodoOption";
import { useSelector, useDispatch } from "react-redux";
import { TodoState, TodoData, fetchTodos } from "../Store/TodoReducer";
import { fetchLists } from "../Store/todoListReducer";
import { StateData } from "../Store";
import TodoHeader from "./TodoHeader";
import Todo from "./Todo";

function MainContent() {
  const { filter, search, todoList } = useSelector<StateData, TodoState>(
    (state: StateData) => state.todo
  );

  const currentlist = useSelector(
    (state: StateData) => state.lists.currentlist
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchTodos());
  }, [currentlist]);

  let doneTodos = 0;

  const todos = todoList
    .filter(
      (todo) =>
        todo.text.toUpperCase().indexOf(search.toUpperCase()) > -1 &&
        (filter === "all" ||
          (filter === "done" && todo.done) ||
          (filter === "undone" && !todo.done))
    )
    .map((todo) => {
      if (todo.done) doneTodos++;
      return <Todo todo={todo} />;
    });

  return (
    <Container>
      <TodoContainer>
        <Wrapper>
          <TodoHeader />
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px 0;
`;

const TodoContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 50px 0;

  background-color: #eee;
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
