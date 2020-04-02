import React, { Component } from "react";
import axios from "axios";

import styled, { keyframes, withTheme } from "styled-components";
import ListedUser from "./ListedUser";
import { FiSearch } from "react-icons/fi";
import { InteractBox } from "./UserRegister";

class UsersList extends Component {
  state = {
    userList: [],
    loading: true,
    searchName: "",
    searchEmail: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.getAllUsers();

    window.addEventListener("keydown", event => {
      if (event.key === "Enter") this.searchHandler();
    });
  }

  componentWillMount() {
    window.removeEventListener("keydown", null);
  }

  deleteHandler = id => {
    this.setState({
      userList: this.state.userList.filter(user => user.id !== id)
    });
  };

  getAllUsers() {

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

        alert("Error Loading Users");
      });
  }

  searchHandler = () => {
    if (this.state.loading) return;

    this.setState({
      loading: true
    });

    if (this.state.searchName === "" && this.state.searchEmail === "") {
      this.getAllUsers();
      return;
    }

    axios
      .get(
        `https://us-central1-future-apis.cloudfunctions.net/api/users/search?name=${this.state.searchName}&email=${this.state.searchEmail}`,
        {
          headers: {
            "api-token": "cazuza-hamilton"
          }
        }
      )
      .then(response => {
        this.setState({
          userList: response.data.result,
          loading: false
        });
      })
      .catch(err => {
        alert("Erro na busca");
      });
  };

  render() {
    const content = this.state.loading ? (
      <Loader />
    ) : (

      <>
        <SearchWrapper>
          <InteractBox
            value={this.state.searchName}
            type="text"
            placeholder="Find user by name"
            name="searchName"
            id=""
            onChange={this.changeHandler}
            autocomplete="off"
          />
          <InteractBox
            value={this.state.searchEmail}
            type="text"
            placeholder="Find user by email"
            name="searchEmail"
            id=""
            onChange={this.changeHandler}
            autocomplete="off"
          />
          <SearchIcon
            onClick={this.searchHandler}
            size="45px"
            color={this.props.theme.fc}
          />
        </SearchWrapper>
        {this.state.userList.map(user => (
          <ListedUser
            goToUserDetails={() => this.props.goToUserDetails(user.id)}
            deleteHandler={this.deleteHandler}
            name={user.name}
            userId={user.id}
            key={user.id}
          />
        ))}
      </>

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


const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 50px;
`;

const SearchIcon = styled(FiSearch)`
  flex: none;
  cursor: pointer;
`;

export const deleteUser = (id, onSuccess, onCatch) => {
  if (!window.confirm("Deseja deletar o usuário ?")) {
    onCatch();
    return;
  }

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

      alert("Erro ao Deletar o Usuário.");
      onCatch();
    });
};

export default withTheme(UsersList);

