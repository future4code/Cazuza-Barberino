import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { Btn } from "../global-style";
import logo from "../../imgs/logo.png";
import { connect } from "react-redux";
import { replace } from "connected-react-router";
import { routes } from "../../containers/Router";

class Header extends Component {
  render() {
    return (
      <Container>
        <Logo src={logo} />
        <LogoutBtn
          onClick={() => {
            localStorage.clear();
            this.props.goToLogin();
          }}
        >
          Logout
        </LogoutBtn>
        <FakeHeader>
          <FakeLogo src={logo} />
        </FakeHeader>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  goToLogin: () => replace(routes.root),
};

export default connect(null, mapDispatchToProps)(Header);

const Container = styled.header`
  width: 100%;
  position: relative;
  background-color: #ed7f61;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
  padding: 4px 16px;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
`;

const LogoutBtn = styled(Btn)``;

const Logo = styled.img`
  height: 40px;
  cursor: pointer;
`;

const FakeHeaderAnimation = keyframes`
  0%{
    height: 100vh;
    opacity: 1;
  }
  50%{
    height: 48px;
    opacity: 1;
  }
  100%{
    opacity: 0;
    height: 48px;
    pointer-events: none;
  }
`;

const FakeHeader = styled.div`
  position: fixed;
  z-index: 20;
  right: 0;
  top: 0;
  width: 100%;
  background-color: #ed7f61;

  animation: ${FakeHeaderAnimation} 1.5s forwards;
`;

const FakeLogoAnimation = keyframes`
  0%{
    height: 106px;
    left: 50%;
  }
  100%{
    height: 40px;
    left: 78.15px; 
  }
`;

const FakeLogo = styled.img`
  position: absolute;
  top: 50%;
  height: 40px;
  left: 78.15px;
  transform: translate(-50%, -50%);
  animation: ${FakeLogoAnimation} 0.75s;
`;
