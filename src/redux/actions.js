export const actions = {
  SEARCH_ITEM: "SEARCH_ITEM",
  FILTER_ITEMS: "FILTER_ITEMS",
  LOAD_ITEMS: "LOAD_ITEMS",
};

export const setFilters = (filterName, filterValue) => (dispatch) => {
  dispatch({
    type: actions.FILTER_ITEMS,
    payload: { [filterName]: filterValue },
  });
};

export const setSearch = (searchText) => (dispatch) => {
  dispatch({
    type: actions.SEARCH_ITEM,
    payload: searchText,
  });
};
export const setLoad = () => (dispatch) => {
  dispatch({
    type: actions.LOAD_ITEMS,
  });
};
