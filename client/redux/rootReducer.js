import { combineReducers } from "redux";

import userReducer from "./userStore/reducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
