import {
  loginAction,
  logoutAction,
  signupAction,
  autoLoginAction,
} from "./actionCreators";
import { productLogoutAction } from "../productStore/actionCreators";
import {
  NotifyAction,
  stopLoadingAction,
} from "../ErrorHandlerStore/actionCreators";

export const thunkSignup = (cred) => {
  return async function (dispatch) {
    let response, data;
    try {
      response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/user/signup",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cred),
        }
      );
      data = await response.json();

      if (!response.ok) throw new Error(data.message);

      dispatch(NotifyAction("SignUp Successfull"));
      dispatch(signupAction(data.accesstoken));
    } catch (err) {
      if (!err.message) return dispatch(NotifyAction("Something went wrong"));
      dispatch(NotifyAction(err.message));
    }
    dispatch(stopLoadingAction());
  };
};

export const thunkLogin = (cred) => {
  return async function (dispatch) {
    let response, data;
    try {
      response = await fetch(process.env.REACT_APP_SERVER_URL + "/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          credentials: "include",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cred),
      });

      data = await response.json();
      if (!response.ok) throw new Error(data.message);

      dispatch(NotifyAction("Login Successfull"));
      dispatch(loginAction(data.accesstoken));
    } catch (err) {
      if (!err.message) return dispatch(NotifyAction("Something went wrong"));
      dispatch(NotifyAction(err.message));
    }
    dispatch(stopLoadingAction());
  };
};

export const thunkAutoLogin = (cred) => {
  return async function (dispatch) {
    let response, data;
    try {
      response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/user/refresh_token",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cred),
        }
      );
      data = await response.json();
      dispatch(autoLoginAction(data.accesstoken));
    } catch (err) {
      if (!err.message) return dispatch(NotifyAction("Something went wrong"));
      dispatch(autoLoginAction(""));
    }
    dispatch(stopLoadingAction());
  };
};

export const thunkLogout = () => {
  return async function (dispatch) {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/user/logout",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error(response.message);

      dispatch(logoutAction());
      dispatch(productLogoutAction());
      dispatch(NotifyAction("Logged out"));
    } catch (err) {
      if (!err.message) return dispatch(NotifyAction("Something went wrong"));
      dispatch(NotifyAction("Logging out failed"));
    }
    dispatch(stopLoadingAction());
  };
};
