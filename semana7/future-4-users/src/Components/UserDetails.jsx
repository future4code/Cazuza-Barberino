import React, { Component } from "react";
import { Form, Button, InteractBox, Loader } from "./UserRegister";
import axios from "axios";
import styled, {
  ThemeProvider,
  keyframes,
  css,
  withTheme
} from "styled-components";
import { deleteUser } from "./UsersList";
import { FiSmile, FiMail, FiXCircle, FiSearch } from "react-icons/fi";

class UserDetails extends Component {
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

    this.userId = this.props.userId;
    this.inputRef = React.createRef();
  }

  getUser = () => {
    axios
      .get(
        `https://us-central1-future-apis.cloudfunctions.net/api/users/${this.userId}`,
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
  };

  componentDidMount() {
    this.getUser();
  }

  deleteHandler = () => {
    if (this.state.deleting || this.state.editing) return;

    this.setState({ deleting: true });
    deleteUser(this.userId, this.props.togglePage, () => {
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

  editHandler = () => {
    if (this.state.deleting || this.state.editing) return;

    this.setState({
      editing: true
    });

    const data = {
      user: {
        name: this.state.name,
        email: this.state.email
      }
    };
    console.log(data);

    axios
      .put(
        `https://us-central1-future-apis.cloudfunctions.net/api/users/${this.userId}`,
        data,
        {
          headers: {
            "api-token": "cazuza-hamilton"
          }
        }
      )
      .then(response => {
        console.log(response);
        this.setState({
          editing: false,
          editorMode: false
        });
      })
      .catch(err => {
        alert("Failed to edit user");
        this.setState({
          editing: false,
          loading: true,
          editorMode: false
        });
        this.getUser();
      });
  };

  render() {
    return (
      <Form as="div">
        {this.state.loading ? (
          <PageLoader />
        ) : (
          <>
            <InputWrapper>
              <FiSmile size="45px" color={this.props.theme.fc} />
              <UserDetailsInput
                ref={this.inputRef}
                value={this.state.name}
                type="text"
                placeholder="Name"
                name="name"
                id=""
                onChange={this.changeHandler}
                required
                disabled={!this.state.editorMode}
                editorMode={this.state.editorMode}
                autocomplete="off"
              />
            </InputWrapper>

            <InputWrapper>
              <FiMail size="45px" color={this.props.theme.fc} />
              <UserDetailsInput
                value={this.state.email}
                type="email"
                placeholder="Email"
                name="email"
                id=""
                onChange={this.changeHandler}
                disabled={!this.state.editorMode}
                editorMode={this.state.editorMode}
                autocomplete="off"
              />
            </InputWrapper>

            <BtnWrapper>
              <HiddenBtnWrapper>
                <HiddenBox as="div" hide={!this.state.editorMode}>
                  <ThemeProvider theme={InvertedTheme}>
                    <Button
                      creating={this.state.editing}
                      as="button"
                      onClick={e => {
                        e.target.blur();
                        this.editHandler();
                      }}
                      type="submit"
                    >
                      {this.state.editing ? <Loader size="40px" /> : "Save"}
                    </Button>
                  </ThemeProvider>
                  <CancelIcon
                    onClick={e => {
                      e.target.blur();
                      this.toggleEditMod();
                    }}
                    size="60px"
                  />
                </HiddenBox>

                <HiddenBox hide={this.state.editorMode}>
                  <Button
                    creating={this.state.editing}
                    as="button"
                    onClick={e => {
                      e.target.blur();
                      this.toggleEditMod();
                    }}
                    type="submit"
                  >
                    {this.state.editing ? <Loader size="40px" /> : "Edit"}
                  </Button>
                </HiddenBox>
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

export default withTheme(UserDetails);

const HiddenBox = styled.div`
  width: 100%;
  flex: none;
  transition: 0.3s;
  overflow: hidden;
  display: flex;
  align-items: center;
  column-gap: 10px;

  ${props =>
    props.hide &&
    css`
      width: 0px;
    `};
`;

const InvertedTheme = ({ fc, bg2 }) => ({
  fc: bg2,
  bg2: fc
});

const CancelIcon = styled(FiXCircle)`
  cursor: pointer;
  color: ${props => props.theme.fc};
`;

const BtnWrapper = styled.div`
  display: flex;
  width: 100%;
  column-gap: 20px;
  align-items: center;
`;

const InputWrapper = styled(BtnWrapper)`
  column-gap: 5px;
`;

const HiddenBtnWrapper = styled(BtnWrapper)`
  flex: 3;
  column-gap: 5px;
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

const UserDetailsInput = styled(InteractBox)`
  transition: 0.3s;

  background-color: ${props =>
    props.editorMode ? props.theme.bg2 : "transparent"};
`;
