const initialState = {
  loading: false,
  list: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BEGIN_FETCH":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_POSTS":
      let list = action.payload.list;
      return {
        ...state,
        list,
        loading: false,
      };
    case "SET_VOTE_DIR":
      return {
        ...state,
        list: state.list.map((post) =>
          post.id !== action.payload.postId
            ? post
            : {
                ...post,
                votesCount:
                  post.votesCount -
                  post.userVoteDirection +
                  action.payload.direction,
                userVoteDirection: action.payload.direction,
              }
        ),
      };
    default:
      return state;
  }
};
