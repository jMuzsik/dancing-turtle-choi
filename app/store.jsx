import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers/index";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";

const composeEnhancers = composeWithDevTools({});

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, createLogger()))
);
