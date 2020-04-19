export type RoutesAction = {
  type: "UPDATE_CURRENT_PAGE";
  payload: {
    newPage: Pages;
  };
};

export enum Pages {
  SwipeScreen,
  MatchScreen,
  ProfileScreen,
}

export interface RoutesState {
  currentPage: Pages;
}
