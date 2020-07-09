import { AUTO_LOGIN, LOGIN, LOGOUT, SIGNUP } from "./actionsTypes";

const initialState = {
  token: "",
  gotInitialData: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...action.payload };
    case SIGNUP:
      return { token: action.payload };
    case LOGOUT:
      return { token: "" };
    case AUTO_LOGIN:
      return { ...action.payload };
    default:
      return state;
  }
};
