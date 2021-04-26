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
};

let reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FILTER_ITEMS:
      return { ...state, ...action.payload };
    case actions.SEARCH_ITEM:
      return { ...state, searchText: action.payload };
    case actions.LOAD_ITEMS:
      return { ...state, beerAmount: state.beerAmount + 9 };
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
