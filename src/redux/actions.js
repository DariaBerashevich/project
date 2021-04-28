export const actions = {
  SEARCH_ITEM: "SEARCH_ITEM",
  FILTER_ITEMS: "FILTER_ITEMS",
  LOAD_ITEMS: "LOAD_ITEMS",
  ADD_TO_FAVORITES: " ADD_TO_FAVORITES",
  DELETE_FROM_FAVORITES: "DELETE_FROM_FAVORITES",
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
export const setFavorite = (beer) => (dispatch) => {
  dispatch({
    type: actions.ADD_TO_FAVORITES,
    payload: beer,
  });
};
export const deleteFavorite = (id) => (dispatch) => {
  dispatch({
    type: actions.DELETE_FROM_FAVORITES,
    id,
  });
};
