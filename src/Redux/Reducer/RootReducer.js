import { combineReducers } from "redux";
import { productsReducer } from "./ProductReducer";

const reducers = combineReducers({
  allProducts: productsReducer,
});

export default reducers;