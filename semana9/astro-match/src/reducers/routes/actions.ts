import { Pages, RoutesAction } from "./types";

export const updateCurrentPage = (newPage: Pages): RoutesAction => ({
  type: "UPDATE_CURRENT_PAGE",
  payload: {
    newPage, // mesma coisa que newPage: newPage
  },
});
