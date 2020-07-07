import { loginAction, logoutAction, signupAction } from "./actionCreators";

export const thunkSignup = (cred) => {
  return async function (dispatch) {
    let response, data;
    try {
      response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_API + "/user/signup",
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
      response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_API + "/user/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            credentials: "include",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cred),
        }
      );
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
    console.log("came here");
    try {
      response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_API + "/user/refresh_token",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cred),
        }
      );
      data = await response.json();
      console.log(data);
      dispatch(loginAction(data.accesstoken));
    } catch (err) {
      console.log(err);
    }
  };
};

export const thunkLogout = () => {
  return async function (dispatch) {
    try {
      await fetch(process.env.NEXT_PUBLIC_SERVER_API + "/user/logout", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(logoutAction());
    } catch (err) {
      console.log(err);
    }
  };
};
