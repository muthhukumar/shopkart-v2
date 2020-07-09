import {
  loginAction,
  logoutAction,
  signupAction,
  autoLoginAction,
} from "./actionCreators";
import { productLogoutAction } from "../productStore/actionCreators";

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
      console.log(data);
      dispatch(signupAction(data.accesstoken));
    } catch (err) {
      console.log(err);
    }
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
      console.log(data);
      dispatch(loginAction(data.accesstoken));
    } catch (err) {
      console.log(err);
    }
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
      dispatch(autoLoginAction(""));
      console.log(err);
    }
  };
};

export const thunkLogout = () => {
  return async function (dispatch) {
    try {
      await fetch(process.env.REACT_APP_SERVER_URL + "/user/logout", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(logoutAction());
      dispatch(productLogoutAction());
    } catch (err) {
      console.log(err);
    }
  };
};
