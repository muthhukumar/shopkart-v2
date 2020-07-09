import { combineReducers } from "redux";

import userReducer from "./userStore/reducer";
import productReducer from "./productStore/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});

export default rootReducer;
