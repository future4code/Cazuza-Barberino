import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { DefaultBox, Btn, InputField } from "../global-style";
import { connect } from "react-redux";
import { createPost } from "../../actions/post";
import { FiLoader } from "react-icons/fi";

class CreatePostForm extends Component {
  state = {
    title: "",
    text: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      title: "",
      text: "",
    });
    this.props.createPost(this.state.title, this.state.text);
  };

  render() {
    const { title, text } = this.state;
    const { loading } = this.props;

    return (
      <Form as="form" onSubmit={this.handleSubmit}>
        <InputField
          value={title}
          onChange={this.handleChange}
          name="title"
          placeholder="Title"
          required
        />
        <InputField
          as="textarea"
          required
          value={text}
          onChange={this.handleChange}
          name="text"
          placeholder="Text"
        />
        <Btn type="submit" disabled={loading}>
          {loading ? (
            <LoadingIcon>
              <FiLoader size="16px" />
            </LoadingIcon>
          ) : (
            "Post"
          )}
        </Btn>
      </Form>
    );
  }
}

const stateToProps = (state) => ({
  loading: state.post.loading,
});

const dispatchToProps = {
  createPost: (title, text) => createPost(title, text),
};

export default connect(stateToProps, dispatchToProps)(CreatePostForm);

const rotate = keyframes`
  0%{
    transform: rotateZ(0deg)
  }
  100%{
    transform: rotateZ(360deg)
  }
`;

const LoadingIcon = styled.div`
  animation: ${rotate} linear infinite 1s;
  display: grid;
  place-content: center;
`;

const Form = styled(DefaultBox)`
  padding: 16px;
  display: grid;
  row-gap: 16px;
  cursor: auto;
`;
