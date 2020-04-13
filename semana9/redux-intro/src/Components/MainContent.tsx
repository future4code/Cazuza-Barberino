import React from "react";
import TodoForm from "./TodoForm";
import styled from "styled-components";

function MainContent() {
  return (
    <Container>
      <TodoContainer>
        <TodoForm />
        <TodoList>
          <Todos>WTf</Todos>
          <Todos>Comprar Coca</Todos>
        </TodoList>
      </TodoContainer>
    </Container>
  );
}

export default MainContent;

const Container = styled.div`
  position: relative;
  flex: 1;
`;

const TodoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 1200px;

  background-color: ${(props) => props.theme.bg};
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodoList = styled.ul``;

const Todos = styled.li``;
