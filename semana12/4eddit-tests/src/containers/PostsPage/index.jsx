import React, { Component } from "react";
import styled from "styled-components";
import Post from "../../components/Post";
import Header from "../../components/Header";
import CreatePostForm from "../../components/CreatePostForm";
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";
import { replace } from "connected-react-router";
import { routes } from "../Router";
import { Btn } from "../../components/global-style";
import ExhibitionMenu from "../../components/ExhibitionMenu";
import jwtDecode from "jwt-decode";
import PostMock from "../../components/PostMock";

// commentsCount: 34
// createdAt: 1585748516971
// id: "0COaXIBbosGCvdIMNv9Y"
// text: "E ele morreu!"
// title: "Atirei o pau no gato!"
// userVoteDirection: 0
// username: "SeiLa"
// votesCount: 8

class PostsPage extends Component {
  state = {
    numberOfPost: 10,
  };

  componentDidMount() {
    if (localStorage.getItem("token") === null) this.props.goToLogin();
    else this.props.fecthPosts();
  }

  loadMorePosts = () => {
    this.setState({
      numberOfPost: this.state.numberOfPost + 10,
    });
  };

  sortPosts = () => {
    switch (this.props.sort) {
      case "new":
        this.props.postList.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "top_rated":
        this.props.postList.sort((a, b) => b.votesCount - a.votesCount);
        break;
      case "hot":
        this.props.postList.sort((a, b) => b.commentsCount - a.commentsCount);
        break;
      default:
        break;
    }
  };

  filterPosts = () => {
    switch (this.props.filter) {
      case "my_posts":
        const username = jwtDecode(localStorage.getItem("token")).username;
        return this.props.postList.filter((post) => post.username === username);
      default:
        return this.props.postList;
    }
  };

  render() {
    const { numberOfPost } = this.state;

    this.sortPosts();
    const filteredPostList = this.filterPosts();
    return (
      <Container>
        <Header />
        <Main>
          <ExhibitionMenu />
          <CreatePostForm />
          {filteredPostList.length > 0 ? (
            <>
              {filteredPostList.slice(0, numberOfPost).map((post) => (
                <Post key={post.id} post={post} />
              ))}
              {filteredPostList.length > numberOfPost && (
                <LoadBtn onClick={this.loadMorePosts}>Load More</LoadBtn>
              )}
            </>
          ) : (
            new Array(5).fill("").map((_, i) => <PostMock key={i} />)
          )}
        </Main>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  postList: state.post.list,
  filter: state.exhibition.filter,
  sort: state.exhibition.sort,
});

const mapDispatchToProps = (dispatch) => ({
  goToLogin: () => dispatch(replace(routes.root)),
  fecthPosts: () => dispatch(getPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 48px 1fr;

  background-color: #dae0e6;
`;

const Main = styled.main`
  padding: 12px 8px;
  display: grid;
  justify-items: center;
  align-items: flex-start;
  align-content: flex-start;
  row-gap: 8px;
`;

const LoadBtn = styled(Btn)`
  width: 100%;
  max-width: 640px;
`;
