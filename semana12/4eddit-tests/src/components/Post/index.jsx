import axios from "axios";
import moment from "moment/moment";
import React, { Component } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { RiArrowUpSLine } from "react-icons/ri";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { vote } from "../../actions/post";
import Comment from "../Comment";
import CreateCommentForm from "../CreateCommentForm";
import { DefaultBox, RateButton } from "../global-style";

class Post extends Component {
  constructor(props) {
    super(props);

    this.postSizeRef = React.createRef();
    this.commentsSizeRef = React.createRef();
  }

  state = {
    showComments: false,
    contentHeight: 0,
    commentHeight: 0,
    comments: null,
  };

  showComments = () => {
    this.setState({
      showComments: !this.state.showComments,
    });
    if (!this.state.comments) this.getPostComments();
  };

  updateContentHeight = () => {
    this.setState({
      contentHeight: this.postSizeRef.current.offsetHeight,
    });
  };

  updateCommentHeight = () => {
    this.setState({
      commentHeight: this.commentsSizeRef.current.offsetHeight,
    });
  };

  componentDidMount() {
    if (this.postSizeRef.current) this.updateContentHeight();

    if (this.commentsSizeRef.current) this.updateCommentHeight();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contentHeight !== this.postSizeRef.current.offsetHeight)
      this.updateContentHeight();

    if (prevState.commentHeight !== this.commentsSizeRef.current.offsetHeight)
      this.updateCommentHeight();
  }

  getPostComments = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts/${this.props.post.id}`,
        {
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );

      this.setState({
        comments: response.data.post.comments,
      });
    } catch (err) {
      console.log("getPostComments " + err);
    }
  };

  render() {
    const { post, vote } = this.props;
    const { showComments, contentHeight, comments, commentHeight } = this.state;

    return (
      <Container>
        <RateBar>
          <RateButton
            onClick={() => vote(post.id, post.userVoteDirection === 1 ? 0 : 1)}
          >
            <GoArrowUp
              color={post.userVoteDirection !== 1 ? "#fff" : "#555"}
              size="20px"
            />
          </RateButton>
          <RatePoints>{post.votesCount}</RatePoints>
          <RateButton
            onClick={() =>
              vote(post.id, post.userVoteDirection === -1 ? 0 : -1)
            }
          >
            <GoArrowDown
              color={post.userVoteDirection !== -1 ? "#fff" : "#555"}
              size="20px"
            />
          </RateButton>
        </RateBar>
        <PostContentView contentHeight={contentHeight}>
          <PostContent ref={this.postSizeRef}>
            <PostUser>
              Posted by {post.username}{" "}
              {moment(post.createdAt).startOf("hour").fromNow()}{" "}
            </PostUser>
            <PostTitle>{post.title}</PostTitle>
            <PostText>{post.text}</PostText>
            <PostActions>
              <PostButton onClick={this.showComments}>
                <FaCommentAlt />
                {post.commentsCount} Comments{"  "}
                <RotatableIcon showComments={showComments}>
                  <RiArrowUpSLine size="16px" />
                </RotatableIcon>
              </PostButton>
            </PostActions>
            {showComments && (
              <CreateCommentForm
                getPostComments={this.getPostComments}
                postId={post.id}
              />
            )}
          </PostContent>
        </PostContentView>
        <CommentsContainerView commentHeight={commentHeight}>
          <CommentsContainer ref={this.commentsSizeRef}>
            {comments &&
              showComments &&
              comments.map((comment) => (
                <Comment key={comment.id} postId={post.id} comment={comment} />
              ))}
          </CommentsContainer>
        </CommentsContainerView>
      </Container>
    );
  }
}

const dispatchToProps = {
  vote: (postId, dir) => vote(postId, dir),
};

export default connect(null, dispatchToProps)(Post);

const expand = keyframes`
  0%{
    transform: scale(0);
  }
  100%{
    transform: scale(1);
  }
`;

const Container = styled(DefaultBox)`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 40px 1fr;
  border: 1px solid #fff;
  transition: transform 0.2s, box-shadow 0.2s;
  animation: ${expand} 0.2s ease-out;

  &:hover {
    border: 1px solid #999;
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const RateBar = styled.div`
  position: relative;
  top: -4px;
  left: -8px;
  z-index: 1;
  /* background-color: #f7f9fa; */
  background-color: #ed7f61;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 24px);
  justify-items: center;
  align-items: center;
  border-bottom-right-radius: 40px;
  border-top-left-radius: 4px;
  box-shadow: 7px 3px 10px rgba(0, 0, 0, 0.2);

  padding: 8px 4px;
`;

const PostContentView = styled.div`
  position: relative;
  overflow: hidden;
  height: ${({ contentHeight }) => `${contentHeight}px`};
  transition: 0.2s ease-out;
`;

const PostContent = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px 16px 8px 8px;
  display: grid;
  justify-items: flex-start;
  align-items: flex-start;
  row-gap: 8px;
`;

const PostUser = styled.p`
  margin: 0;
  color: #999;
  font-size: 12px;
`;

const PostTitle = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
`;
const PostText = styled.p`
  margin: 0;
`;

const PostActions = styled.div`
  display: grid;
  align-items: center;
`;

const PostButton = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  align-items: center;
  color: #999;
  padding: 4px;
  border-radius: 4px;
  font-size: 12px;
  user-select: none;

  &:hover {
    background-color: #eee;
  }
`;

const RatePoints = styled.p`
  color: #fff;
  font-weight: bold;
`;

const RotatableIcon = styled.div`
  transition: 0.2s ease-out;
  transform: rotate(${(props) => (props.showComments ? "180deg" : "0deg")});
  display: grid;
  place-content: center;
`;

const CommentsContainerView = styled.div`
  position: relative;
  grid-column: 1/3;
  overflow: hidden;
  height: ${({ commentHeight }) => `${commentHeight}px`};
  transition: 0.2s linear;
`;

const CommentsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  row-gap: 12px;
  padding-bottom: 16px;
`;
