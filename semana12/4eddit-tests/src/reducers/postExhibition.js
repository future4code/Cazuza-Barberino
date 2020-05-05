const initialState = {
  sort: "top_rated",
  filter: "all_posts",
};

const postExhibitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SORT":
      return {
        ...state,
        sort: action.payload.sort,
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload.filter,
      };
    default:
      return state;
  }
};

export default postExhibitionReducer;
