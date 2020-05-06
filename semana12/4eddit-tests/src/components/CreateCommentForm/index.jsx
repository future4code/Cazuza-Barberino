import React, { Component } from "react";
import { Btn, InputField } from "../global-style";
import axios from "axios";

export class CreateCommentForm extends Component {
  state = {
    comment: "",
    creatingComment: false,
  };

  createComment = async () => {
    try {
      this.setState({
        creatingComment: true,
      });

      const body = {
        text: this.state.comment,
      };
      await axios.post(
        `https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts/${this.props.postId}/comment`,
        body,
        {
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );

      await this.props.getPostComments();

      this.setState({
        creatingComment: false,
      });
    } catch (err) {}
  };

  render() {
    return (
      <form
        style={{
          width: "100%",
          display: "grid",
          gridAutoFlow: "row",
          rowGap: "8px",
        }}
        onSubmit={(event) => {
          if (this.state.creatingComment) return;
          event.preventDefault();
          this.createComment();
        }}
      >
        <InputField
          as="textarea"
          value={this.state.comment}
          onChange={(event) =>
            this.setState({
              comment: event.target.value,
            })
          }
          placeholder="What are your thoughts?"
          required
        />
        <Btn
          style={{
            justifySelf: "start",
          }}
          type="submit"
        >
          Comment
        </Btn>
      </form>
    );
  }
}

export default CreateCommentForm;
