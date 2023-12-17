import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reducers from "./Redux/Reducer/RootReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const store = createStore(reducers, applyMiddleware(thunk));

export default store;