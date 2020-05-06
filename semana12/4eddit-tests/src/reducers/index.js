import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { postReducer } from "./post";
import postExhibitionReducer from "./postExhibition";

export const generateReducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    post: postReducer,
    exhibition: postExhibitionReducer,
  });
