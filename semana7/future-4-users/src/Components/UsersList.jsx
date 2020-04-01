import React, { Component } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import ListedUser from "./ListedUser";

export default class UsersList extends Component {
  state = {
    userList: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get("https://us-central1-future-apis.cloudfunctions.net/api/users", {
        headers: {
          "api-token": "cazuza-hamilton"
        }
      })
      .then(response => {
        this.setState({
          userList: response.data.result,
          loading: false
        });
      })
      .catch(err => {
        alert("wtf");
        this.setState({
          loading: false
        });
      });
  }

  deleteHandler = id => {
    this.setState({
      userList: this.state.userList.filter(user => user.id !== id)
    });
  };

  render() {
    const content = this.state.loading ? (
      <Loader />
    ) : (
      this.state.userList.map(user => (
        <ListedUser
          goToUserDetails={() => this.props.goToUserDetails(user.id)}
          deleteHandler={this.deleteHandler}
          name={user.name}
          userId={user.id}
          key={user.id}
        />
      ))
    );
    return <Container>{content}</Container>;
  }
}

const Container = styled.div`
  /* border: 5px solid black; */
  position: relative;

  width: 100%;
  max-width: 500px;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const rotate = keyframes`
    0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  border: 16px solid ${props => props.theme.bg2}; /* Light grey */
  border-top: 16px solid ${props => props.theme.fc}; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${rotate} 2s linear infinite;
`;

export const deleteUser = (id, onSuccess, onCatch) => {
  axios
    .delete(
      `https://us-central1-future-apis.cloudfunctions.net/api/users/${id}`,
      {
        headers: {
          "api-token": "cazuza-hamilton"
        }
      }
    )
    .then(response => {
      onSuccess();
    })
    .catch(err => {
      onCatch();
    });
};
