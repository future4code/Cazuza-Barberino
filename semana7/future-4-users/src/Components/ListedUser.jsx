import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "./UserRegister";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

export default class ListedUser extends Component {
  state = {
    deleting: false
  };

  deleteHandler = () => {
    if (this.state.deleting) return;

    this.setState({ deleting: true });

    axios
      .delete(
        `https://us-central1-future-apis.cloudfunctions.net/api/users/${this.props.userId}`,
        {
          headers: {
            "api-token": "cazuza-hamilton"
          }
        }
      )
      .then(response => {
        this.props.deleteHandler(this.props.userId);
        this.setState({
          deleting: false
        });
      })
      .catch(err => {
        alert("wtf");
        this.setState({
          deleting: false
        });
      });
  };

  render() {
    const { name } = this.props;

    return (
      <Container as="div">
        <Text>{name}</Text>
        <DeleteButtton onClick={this.deleteHandler} as="button">
          {this.state.deleting ? <Icon /> : "X"}
        </DeleteButtton>
      </Container>
    );
  }
}

const rotate = keyframes`
    0% { transform:  rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Icon = styled(FaSpinner)`
  animation: ${rotate} 2s linear infinite;
`;

const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  background-color: ${props => props.theme.bg3};
  border-radius: 8px;
  padding: 5px 10px;
  margin-bottom: 5px;
  transition: 0.2s ease-out;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.5);

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    transform: translateY(-5px);
  }
`;

const Text = styled.p`
  flex: 1;
  color: ${props => props.theme.bg};
  text-align: center;
  font-size: 20px;
  cursor: pointer;
`;

const DeleteButtton = styled(Button)`
  height: 100%;
  margin: 0;
  width: 32px;
  padding: 0;
  margin-left: 10px;
  flex: none;

  display: flex;
  justify-content: center;
  align-items: center;
`;
