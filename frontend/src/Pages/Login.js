import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "../components/Input";
import useInput from "../lib/input-hook";
import { thunkLogin } from "../redux/userStore/thunkActionCreators";
import { loadingAction } from "../redux/ErrorHandlerStore/actionCreators";

import "./Login.css";

function Login() {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const dispatch = useDispatch();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const cred = {
      email,
      password,
    };
    dispatch(loadingAction());
    dispatch(thunkLogin(cred));
  };
  return (
    <div className="login-main">
      <div className="login-container">
        <h3>Login</h3>
        <form onSubmit={formSubmitHandler}>
          <Input
            title="Email"
            placeholder="email"
            inputType="email"
            required={true}
            value={email}
            onChange={setEmail}
          />
          <Input
            title="Password"
            placeholder="password"
            inputType="password"
            required={true}
            value={password}
            onChange={setPassword}
          />
          <button type="submit">login</button>
        </form>
        <div className="create-account">
          No account? <Link to="/signup">create one!</Link>
        </div>
      </div>
      <div className="backtohome">
        Back to <Link to="/home">Home</Link>
      </div>
    </div>
  );
}

export default Login;
