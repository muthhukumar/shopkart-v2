import { combineReducers } from "redux";

import userReducer from "./userStore/reducer";
import productReducer from "./productStore/reducer";
import actionReducer from "./ErrorHandlerStore/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  action: actionReducer,
});

export default rootReducer;
