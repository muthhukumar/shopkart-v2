import { LOGIN, LOGOUT, SIGNUP } from "./actionsTypes";

const initialState = {
  token: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log("came here");
      return { token: action.payload };
    case SIGNUP:
      console.log("sign up came here");
      return { token: action.payload };
    case LOGOUT:
      return { token: "" };
    default:
      return state;
  }
};
