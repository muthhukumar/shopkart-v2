import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "../components/Input";
import useCustomInput from "../lib/input-hook";
import { thunkSignup } from "../redux/userStore/thunkActionCreators";
import { loadingAction } from "../redux/ErrorHandlerStore/actionCreators";

import "./Signup.css";
function SignUp() {
  const [email, setEmail] = useCustomInput();
  const [password, setPassword] = useCustomInput();
  const [username, setUsername] = useCustomInput();
  const [phonenumber, setPhonenumber] = useCustomInput();

  const dispatch = useDispatch();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const credentials = {
      email,
      password,
      username,
      phonenumber,
    };
    dispatch(loadingAction());
    dispatch(thunkSignup(credentials));
  };
  return (
    <div className="signup-main">
      <div className="signup-container">
        <h3>Sign up</h3>
        <form onSubmit={formSubmitHandler}>
          <Input
            title="Username"
            placeholder="username"
            inputType="text"
            required={true}
            value={username}
            onChange={setUsername}
          />
          <Input
            value={email}
            title="Email"
            placeholder="email"
            inputType="email"
            required={true}
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
          <Input
            title="Phonenumber"
            placeholder="phonenumber"
            inputType="text"
            required={true}
            value={phonenumber}
            onChange={setPhonenumber}
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
