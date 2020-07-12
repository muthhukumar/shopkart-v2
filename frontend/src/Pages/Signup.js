import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import Input from "../components/Input";
import { thunkSignup } from "../redux/userStore/thunkActionCreators";
import { loadingAction } from "../redux/ErrorHandlerStore/actionCreators";
import "./Signup.css";

function SignUp() {
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const formSubmitHandler = (data) => {
    dispatch(loadingAction());
    const cred = {
      username: data.Username,
      password: data.Password,
      email: data.Email,
      phonenumber: data.Phonenumber,
    };
    dispatch(thunkSignup(cred));
  };
  return (
    <div className="signup-main">
      <div className="signup-container">
        <h3>Sign up</h3>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <Input
            title="Username"
            placeholder="username"
            inputType="text"
            ref={register({
              required: true,
              minLength: 4,
              pattern: /^[a-zA-Z0-9]+$/,
            })}
            error={errors.Username && "Username must have 4 characters"}
          />
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
          <Input
            title="Phonenumber"
            placeholder="phonenumber"
            inputType="text"
            ref={register({
              required: true,
              minLength: 10,
              pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
              maxLength: 10,
            })}
            error={errors.Phonenumber && "Please enter valid phone number"}
          />
          <button type="submit">Sign up</button>
        </form>
        <div className="existing-user">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
      <div className="backtohome">
        Back to <Link to="/home">Home</Link>
      </div>
    </div>
  );
}

export default SignUp;
