import React, { Component } from "react";
import TodoForm from "./TodoForm";
import styled from "styled-components";
import TodoDisplay from "./TodoDisplay";

export default class TodoList extends Component {
  state = {
    todos: [],
    filterInput: ""
  };

  addTodo = newTodo => {
    this.setState({
      todos: [newTodo, ...this.state.todos]
    });
  };

  toggleTodo = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        } else return todo;
      })
    });
  };

  changeFilter = event => {
    this.setState({
      filterInput: event.target.value
    });
  };

  changeName = (event, id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            name: event.target.value
          };
        } else return todo;
      })
    });
  };

  removeTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  removeAll = () => {
    this.setState({
      todos: []
    });
  };

  componentDidMount() {
    let todos = localStorage.getItem("todos");
    if (!todos) return;

    todos = JSON.parse(todos);

    this.setState({
      todos: todos
    });
  }

  componentDidUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  sortTodos = () => {
    this.setState({
      todos: this.state.todos.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    });
  };

  reverseTodos = () => {
    this.setState({
      todos: this.state.todos.reverse()
    });
  };

  render() {
    return (
      <Container>
        <Header>
          <TodoForm onSubmit={this.addTodo} />
          <Input
            type="text"
            name="filterInput"
            value={this.state.filterInput}
            onChange={this.changeFilter}
            placeholder="Filter"
          />
        </Header>
        <Content>
          <TodoDisplay
            name="To Do"
            todos={this.state.todos}
            remove={this.removeTodo}
            toggle={this.toggleTodo}
            changeName={this.changeName}
            condition={false}
            filterInput={this.state.filterInput}
          />
          <TodoDisplay
            name="Done"
            todos={this.state.todos}
            remove={this.removeTodo}
            toggle={this.toggleTodo}
            changeName={this.changeName}
            condition={true}
            filterInput={this.state.filterInput}
          />
        </Content>
        <Footer>
          <Wrapper>
            <LeftBtn onClick={this.sortTodos}>Sort Todo's</LeftBtn>
            <RightBtn
              onClick={() => {
                this.sortTodos();
                this.reverseTodos();
              }}
            >
              Sort Reverse
            </RightBtn>
          </Wrapper>
          <InverseBtn onClick={this.removeAll}>Remove All Todos's</InverseBtn>
        </Footer>
      </Container>
    );
  }
}

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f3f3f3;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 10px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Footer = styled.div`
  flex: none;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5px;
  margin-bottom: 5px;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  font-weight: 700;
  border: 2px solid black;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;

  transition: 0.2s;

  &:hover {
    color: white;
    background-color: black;
  }

  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
`;

const LeftBtn = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;
const RightBtn = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const InverseBtn = styled(Button)`
  background-color: black;
  color: white;

  &:hover {
    color: black;
    background-color: white;
  }
`;

const Input = styled.input`
  display: block;
  background-color: white;
  color: black;
  border: 2px solid black;
  padding: 5px 10px;
  border-radius: 10px;
`;
