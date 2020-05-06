import axios from "axios";

const fetchPosts = (list) => ({
  type: "FETCH_POSTS",
  payload: {
    list,
  },
});

const beginFetch = () => ({
  type: "BEGIN_FETCH",
});

const setVoteDirection = (postId, direction) => ({
  type: "SET_VOTE_DIR",
  payload: {
    postId,
    direction,
  },
});

export const getPosts = () => async (dispatch) => {
  try {
    dispatch(beginFetch());

    const response = await axios.get(
      "https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts",
      {
        headers: {
          auth: localStorage.getItem("token"),
        },
      }
    );

    dispatch(fetchPosts(response.data.posts));
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (title, text) => async (dispatch) => {
  try {
    dispatch(beginFetch());
    const body = {
      text,
      title,
    };

    await axios.post(
      "https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts",
      body,
      {
        headers: {
          auth: localStorage.getItem("token"),
        },
      }
    );

    // console.log(response);

    dispatch(getPosts());
  } catch (err) {}
};

export const vote = (postId, direction) => (dispatch) => {
  try {
    dispatch(setVoteDirection(postId, direction));
    const body = { direction };
    axios.put(
      `https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts/${postId}/vote`,
      body,
      {
        headers: {
          auth: localStorage.getItem("token"),
        },
      }
    );
  } catch (err) {}
};
