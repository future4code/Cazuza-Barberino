import React, { Component } from "react";
import styled, { keyframes, css } from "styled-components";
import { InputField, Btn } from "../../components/global-style";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router";
import axios from "axios";

class LoginPage extends Component {
  state = {
    loading: false,
    loginForm: true,
    username: "",
    email: "",
    password: "",
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    this.login();
  };

  handleSignUpSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    this.signUp();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  toggleForm = () => {
    this.setState({
      loginForm: !this.state.loginForm,
      userName: "",
      email: "",
      password: "",
    });
  };

  login = async () => {
    try {
      const body = {
        email: this.state.email,
        password: this.state.password,
      };
      const response = await axios.post(
        "https://us-central1-future-apis.cloudfunctions.net/fourEddit/login",
        body
      );

      localStorage.setItem("token", response.data.token);
      this.props.goToPostList();
    } catch (err) {}
  };

  signUp = async () => {
    try {
      const body = {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
      };
      const response = await axios.post(
        "https://us-central1-future-apis.cloudfunctions.net/fourEddit/signup",
        body
      );

      localStorage.setItem("token", response.data.token);
      this.props.goToPostList();
    } catch (err) {}
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <Container>
        <Logo src={require("../../imgs/logo.png")} />
        <FormWrapper loginForm={this.state.loginForm}>
          <Form
            loading={this.state.loading}
            loginForm={this.state.loginForm}
            onSubmit={this.handleLoginSubmit}
          >
            <InputField
              placeholder="Email"
              type="email"
              name={"email"}
              value={email}
              onChange={this.handleChange}
              required
            />
            <InputField
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
            <LoginBtn type="submit">Log In</LoginBtn>
            <SignUpMsg>
              New to 4eddit?{" "}
              <SignUPBtn onClick={this.toggleForm}>Sign UP</SignUPBtn>
            </SignUpMsg>
            <Loading loading={this.state.loading} />
          </Form>
          <Form
            loading={this.state.loading}
            loginForm={!this.state.loginForm}
            onSubmit={this.handleSignUpSubmit}
          >
            <InputField
              placeholder="Username"
              name={"username"}
              value={username}
              onChange={this.handleChange}
              required
            />
            <InputField
              type="email"
              placeholder="Email"
              name={"email"}
              value={email}
              onChange={this.handleChange}
              required
            />
            <InputField
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
            <LoginBtn type="submit">Sign Up</LoginBtn>
            <SignUpMsg>
              Already a 4edditor?{" "}
              <SignUPBtn onClick={this.toggleForm}>Log In</SignUPBtn>
            </SignUpMsg>
            <Loading loading={this.state.loading} />
          </Form>
        </FormWrapper>
      </Container>
    );
  }
}

const dispatchToProps = {
  goToPostList: () => push(routes.postList),
};

export default connect(null, dispatchToProps)(LoginPage);

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  justify-items: center;
  place-content: center;
  row-gap: 64px;
  background-color: #ed7f61;
  overflow: hidden;
`;

const FormWrapper = styled.div`
  position: relative;
  transition: left 0.3s;
  top: 0;
  left: ${(props) => (props.loginForm ? "51.5%" : "-51.5%")};
  width: 200%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 24px;
`;

const TestAnimation = keyframes`
  0%{
    clip-path: circle(400px at center);
    row-gap: 16px;
  }
  50%{
    row-gap: 0px;
  }
  100%{
    clip-path: circle(50px at center);
    row-gap: 0px;
  }
`;

const loadingAnimaton2 = keyframes`
   to {
    transform: rotateY(540deg);
  }
`;

const Form = styled.form`
  position: relative;
  transition: opacity 0.3s;
  opacity: ${(props) => (props.loginForm ? 1 : 0)};
  display: grid;
  row-gap: 16px;

  ${(props) =>
    props.loading &&
    css`
      animation: ${TestAnimation} 0.5s forwards,
        ${loadingAnimaton2} 1s ease-in-out 0.4s infinite alternate;
    `}
`;

const loadingAnimaton = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${require("../../imgs/fire-logo.png")}) no-repeat center;
  background-size: 100px 100px;
  background-color: #ed7f61;
  pointer-events: none;
  opacity: 0;
  display: grid;
  place-content: center;

  ${(props) =>
    props.loading &&
    css`
      animation: ${loadingAnimaton} 0.25s 0.35s forwards;
      pointer-events: auto;
    `};
`;

const LoginBtn = styled(Btn)`
  background-color: white;
  color: #ed7f61;

  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`;

const Logo = styled.img`
  height: 100%;
`;

const SignUpMsg = styled.p`
  margin: 0;
  color: white;
  justify-self: center;
`;

const SignUPBtn = styled.span`
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
`;
