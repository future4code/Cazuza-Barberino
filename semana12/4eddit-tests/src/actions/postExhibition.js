export const setSort = (sort) => ({
  type: "SET_SORT",
  payload: {
    sort,
  },
});

export const setFilter = (filter) => ({
  type: "SET_FILTER",
  payload: {
    filter,
  },
});
