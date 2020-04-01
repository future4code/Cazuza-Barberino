import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import UsersList from "./UsersList";
import UserRegister, { Button } from "./UserRegister";
import UserDetails from "./UserDetails";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };

    this.userId = 0;
  }
  defContent = () => {
    switch (this.state.page) {
      case 0:
        return <UserRegister />;
      case 1:
        return <UsersList goToUserDetails={this.goToUserDetails} />;
      case 2:
        return (
          <UserDetails userId={this.userId} togglePage={this.togglePage} />
        );
      default:
        return <h1> ERRO </h1>;
    }
  };

  goToUserDetails = id => {
    this.userId = id;
    this.setState({
      page: 2
    });
  };

  togglePage = () => {
    this.setState({
      page: this.state.page != 1 ? 1 : 0
    });
  };

  render() {
    const content = this.defContent();

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <SideButton
            onClick={e => {
              e.target.blur();
              this.togglePage();
            }}
            as="button"
            type="submit"
          >
            {this.state.page != 1 ? "User List" : "Register"}
          </SideButton>
          <Title>Future4 Users</Title>
          {content}
        </Container>
      </ThemeProvider>
    );
  }
}

const theme = {
  bg: "#c0392b",
  bg2: "#e74c3c",

  bg3: "#bdc3c7",
  fc: "#ecf0f1"
};

const Title = styled.h1`
  color: ${props => props.theme.fc};
  margin: 50px 0;
`;

const Container = styled.div`
  position: absolute;
  background-color: ${props => props.theme.bg};
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const SideButton = styled(Button)`
  position: absolute;
  top: 20px;
  left: 20px;

  width: auto;
`;
