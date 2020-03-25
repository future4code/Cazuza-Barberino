import React, { Component } from "react";
import Todo from "./Todo";
import styled from "styled-components";

export default class TodoDisplay extends Component {
  includeFilter = text => {
    return (
      text.toUpperCase().indexOf(this.props.filterInput.toUpperCase()) > -1
    );
  };

  render() {
    const { condition, name, todos, remove, toggle, changeName } = this.props;

    return (
      <Container>
        <Name>{name}</Name>

        <Viewport>
          <TodoList>
            {todos.map(todo => {
              if (todo.completed === condition && this.includeFilter(todo.name))
                return (
                  <Todo
                    changeName={event => changeName(event, todo.id)}
                    toggle={() => toggle(todo.id)}
                    remove={() => remove(todo.id)}
                    name={todo.name}
                    key={todo.id}
                    completed={todo.completed}
                  />
                );
            })}
          </TodoList>
        </Viewport>
      </Container>
    );
  }
}

const Name = styled.h3`
  width: 100%;
  background-color: #ededed;
  text-align: center;
  padding: 5px;
`;

const Container = styled.div`
  width: 100%;
  height: 40vh;

  border: 2px solid black;
  padding-right: 2px;
  padding-bottom: 3px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;

const Viewport = styled.div`
  height: 100%;
  width: 270px;
  overflow-y: scroll;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;
