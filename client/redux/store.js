import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

const initialState = {
  user: {
    token: "",
  },
};
export const initializeStore = (preloadedState = initialState) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};
