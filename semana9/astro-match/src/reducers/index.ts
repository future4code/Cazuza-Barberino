import { combineReducers } from "redux";
import routes from "./routes";
import profiles from "./profiles";
import { RoutesState } from "./routes/types";
import { ProfilesState } from "./profiles/types";

export interface RootState {
  routes: RoutesState;
  profiles: ProfilesState;
}

const rootReducer = combineReducers<RootState>({
  routes, // equivalente a routes: routes
  profiles,
});

export default rootReducer;
