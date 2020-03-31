import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { FiLoader } from "react-icons/fi";

export default class UserRegister extends Component {
  state = {
    name: "",
    email: "",
    creating: false
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.creating) return;

    this.setState({
      creating: true
    });

    const data = {
      name: this.state.name,
      email: this.state.email
    };

    axios
      .post(
        "https://us-central1-future-apis.cloudfunctions.net/api/users",
        data,
        {
          headers: {
            "api-token": "cazuza-hamilton"
          }
        }
      )
      .then(response => {
        this.setState({
          creating: false
        });
        console.log(response);
      })
      .catch(err => {
        this.setState({
          creating: false
        });
        alert("wtf");
      });
  };

  render() {
    return (
      <Form onSubmit={this.submitHandler}>
        <InteractBox
          value={this.state.name}
          type="text"
          placeholder="Name"
          name="name"
          id=""
          onChange={this.changeHandler}
          required
        />
        <InteractBox
          value={this.state.email}
          type="email"
          placeholder="Email"
          name="email"
          id=""
          onChange={this.changeHandler}
        />
        <Button
          creating={this.state.creating}
          as="button"
          onClick={e => e.target.blur()}
          type="submit"
        >
          {this.state.creating ? <Loader size="40px" /> : "Cadastrar"}
        </Button>
      </Form>
    );
  }
}

const rotate = keyframes`
    0% { transform:  rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled(FiLoader)`
  animation: ${rotate} 2s linear infinite;
`;

const Form = styled.form`
  padding: 96px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InteractBox = styled.input`
  margin-bottom: 20px;
  border: none;

  width: 100%;
  height: 70px;
  background-color: ${props => props.theme.bg2};
  border-radius: 8px;
  padding: 0 24px;

  font-size: 18px;
  color: ${props => props.theme.fc};
`;

export const Button = styled(InteractBox)`
  cursor: pointer;
  width: ${props => (!props.creating ? "100%" : "100px")};
  transition: 0.2s, width 0.5s ease-out;
  border: 2px solid ${props => props.theme.bg2};

  &:hover {
    color: ${props => props.theme.bg2};
    background-color: ${props => props.theme.fc};
  }
`;
