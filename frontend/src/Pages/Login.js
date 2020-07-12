import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Input from "../components/Input";
import { thunkLogin } from "../redux/userStore/thunkActionCreators";
import { loadingAction } from "../redux/ErrorHandlerStore/actionCreators";

import "./Login.css";

function Login() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const formSubmitHandler = (data) => {
    dispatch(loadingAction());
    const cred = {
      email: data.Email,
      password: data.Password,
    };
    dispatch(thunkLogin(cred));
  };
  return (
    <div className="login-main">
      <div className="login-container">
        <h3>Login</h3>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <Input
            title="Email"
            placeholder="email"
            inputType="email"
            ref={register({ required: true })}
            error={errors.Email && "Please enter valid Email address"}
          />
          <Input
            title="Password"
            placeholder="password"
            inputType="password"
            ref={register({ required: true, minLength: 8 })}
            error={errors.Password && "Password must be atleast 8 characters"}
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
