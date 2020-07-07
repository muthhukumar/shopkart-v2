import { SIGNUP, LOGOUT, LOGIN } from "./actionsTypes";

export function signupAction(token) {
  return {
    payload: token,
    type: SIGNUP,
  };
}
export function loginAction(token) {
  return {
    payload: token,
    type: LOGIN,
  };
}
export function logoutAction() {
  return {
    type: LOGOUT,
  };
}
