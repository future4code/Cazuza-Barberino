import React from "react";
import "./App.css";
import Post from "./components/Post/Post.jsx";
import styled from "styled-components";
import InputAnimated from "./components/InputAnimated.jsx";

class App extends React.Component {
  state = {
    userName: "",
    profileId: "",
    photoId: "",
    posts: [
      {
        usuario: "Paulinha",
        foto: "https://picsum.photos/50/50?random=1",
        post: "https://picsum.photos/200/150?random=1"
      },
      {
        usuario: "Soter",
        foto: "https://picsum.photos/50/50?random=2",
        post: "https://picsum.photos/200/150?random=2"
      },
      {
        usuario: "João",
        foto: "https://picsum.photos/50/50?random=3",
        post: "https://picsum.photos/200/150?random=3"
      }
    ]
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.userName !== "") {
      const newPost = {
        usuario: this.state.userName,
        foto: `https://picsum.photos/50/50?random=${this.state.profileId}`,
        post: `https://picsum.photos/200/150?random=${this.state.photoId}`
      };
      this.setState({
        posts: [...this.state.posts, newPost],
        userName: "",
        profileId: "",
        photoId: ""
      });
    }
  };

  handleInput = (event, numberInput) => {
    console.log(event.target);
    if (numberInput) {
      const re = /^[0-9\b]+$/;
      if (!re.test(event.target.value) && event.target.value !== "") return;
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className={"app-container"}>
        <Form onSubmit={this.handleSubmit}>
          <InputAnimated
            value={this.state.userName}
            handleChange={this.handleInput}
            type="text"
            name="userName"
            id=""
            displayName="User Name"
          />
          <InputWrapper>
            <InputAnimated
              value={this.state.profileId}
              handleChange={this.handleInput}
              type="text"
              name="profileId"
              id=""
              displayName="Profile Photo ID"
              numberInput={true}
            />
            <InputAnimated
              value={this.state.photoId}
              handleChange={this.handleInput}
              type="text"
              name="photoId"
              id=""
              displayName="Photo ID"
              numberInput={true}
            />
          </InputWrapper>
          <Button type="submit">Enviar</Button>
        </Form>

        {this.state.posts.map((post, index) => (
          <Post
            key={index}
            nomeUsuario={post.usuario}
            fotoUsuario={post.foto}
            fotoPost={post.post}
          />
        ))}
      </div>
    );
  }
}

const Form = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border: 2px solid black;
  margin-top: 10px;
  border-radius: 5px;
  font-weight: 700;
  padding: 10px 0;
  width: 200px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const InputWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  width: 100%;
`;

export default App;
