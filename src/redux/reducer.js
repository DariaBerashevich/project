import { actions } from "./actions";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  alcoholVol: 2,
  bitterness: 0,
  colorEBC: 4,
  searchText: "",
  beerAmount: 9,
  favoriteList: [],
};

let reducer = (state = initialState, action) => {
  let deleteItem;
  let newFavList = [];
  let newDeleteList = [];
  switch (action.type) {
    case actions.FILTER_ITEMS:
      return { ...state, ...action.payload };
    case actions.SEARCH_ITEM:
      return { ...state, searchText: action.payload };
    case actions.LOAD_ITEMS:
      return { ...state, beerAmount: state.beerAmount + 9 };
    case actions.ADD_TO_FAVORITES:
      newFavList.push(action.payload);
      return { ...state, favoriteList: state.favoriteList.concat(newFavList) };
    case actions.DELETE_FROM_FAVORITES:
      deleteItem = state.favoriteList.find((beer) => {
        return beer.id === action.id;
      });
      newDeleteList = state.favoriteList.filter(
        (elem) => elem.id !== deleteItem.id
      );
      console.log(state.favoriteList);
      return { ...state, favoriteList: newDeleteList };
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default reducer;
