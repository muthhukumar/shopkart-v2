import { AUTO_LOGIN, SIGNUP, LOGOUT, LOGIN } from "./actionsTypes";

export function signupAction(token) {
  return {
    payload: token,
    type: SIGNUP,
  };
}
export function loginAction(token) {
  return {
    payload: { gotInitialData: true, token },
    type: LOGIN,
  };
}
export function logoutAction() {
  return {
    type: LOGOUT,
  };
}
export function autoLoginAction(token) {
  return {
    type: AUTO_LOGIN,
    payload: { gotInitialData: true, token },
  };
}
