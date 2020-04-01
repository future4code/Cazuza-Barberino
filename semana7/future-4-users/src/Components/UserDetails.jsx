import React, { Component } from "react";
import { Form, Button, InteractBox, Loader } from "./UserRegister";
import axios from "axios";
import styled, { ThemeProvider, keyframes, css } from "styled-components";
import { deleteUser } from "./UsersList";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      loading: true,
      deleting: false,
      editing: false,
      editorMode: false
    };

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    axios
      .get(
        `https://us-central1-future-apis.cloudfunctions
        .net/api/users/${this.props.userId}`,
        {
          headers: {
            "api-token": "cazuza-hamilton"
          }
        }
      )
      .then(response => {
        this.setState({
          name: response.data.result.name,
          email: response.data.result.email,
          loading: false
        });
      })
      .catch(err => {
        alert("User Details WTF");
      });
  }

  deleteHandler = () => {
    if (this.state.deleting) return;

    this.setState({ deleting: true });
    deleteUser(this.props.userId, this.props.togglePage, () => {
      alert("wtf");
      this.setState({
        deleting: false
      });
    });
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
  };

  toggleEditMod = () => {
    this.setState({
      editorMode: !this.state.editorMode
    });
  };

  componentDidUpdate() {
    if (this.state.editorMode) this.inputRef.current.focus();
  }

  render() {
    return (
      <Form as="div">
        {this.state.loading ? (
          <PageLoader />
        ) : (
          <>
            <InteractBox
              ref={this.inputRef}
              value={this.state.name}
              type="text"
              placeholder="Name"
              name="name"
              id=""
              onChange={this.changeHandler}
              required
              disabled={!this.state.editorMode}
              autocomplete="off"
            />
            <InteractBox
              value={this.state.email}
              type="email"
              placeholder="Email"
              name="email"
              id=""
              onChange={this.changeHandler}
              disabled={!this.state.editorMode}
              autocomplete="off"
            />
            <BtnWrapper>
              <HiddenBtnWrapper>
                <ThemeProvider theme={InvertedTheme}>
                  <HiddenButton
                    creating={this.state.editing}
                    as="button"
                    onClick={e => {
                      e.target.blur();
                      this.toggleEditMod();
                    }}
                    type="submit"
                    hide={!this.state.editorMode}
                  >
                    {this.state.editing ? <Loader size="40px" /> : "Save"}
                  </HiddenButton>
                </ThemeProvider>
                <HiddenButton
                  creating={this.state.editing}
                  as="button"
                  onClick={e => {
                    e.target.blur();
                    this.toggleEditMod();
                  }}
                  type="submit"
                  hide={this.state.editorMode}
                >
                  {this.state.editing ? <Loader size="40px" /> : "Edit"}
                </HiddenButton>
              </HiddenBtnWrapper>
              <Button
                creating={this.state.deleting}
                as="button"
                onClick={e => {
                  e.target.blur();
                  this.deleteHandler();
                }}
                type="submit"
              >
                {this.state.deleting ? <Loader size="40px" /> : "Delete"}
              </Button>
            </BtnWrapper>
          </>
        )}
      </Form>
    );
  }
}

const HiddenButton = styled(Button)`
  flex: none;
  transition: 0.3s;
  overflow: hidden;
  ${props =>
    props.hide &&
    css`
      box-sizing: border-box;
      min-width: 0px;
      width: 0px;
      padding: 0px;
      margin: 0px;
      border: none;
      /* transform: scaleX(0); */
    `};
`;

const InvertedTheme = ({ fc, bg2 }) => ({
  fc: bg2,
  bg2: fc
});

const BtnWrapper = styled.div`
  display: flex;
  width: 100%;
  column-gap: 20px;
`;

const HiddenBtnWrapper = styled(BtnWrapper)`
  flex: 3;
  column-gap: 0;
`;

const rotate = keyframes`
    0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

const PageLoader = styled.div`
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
