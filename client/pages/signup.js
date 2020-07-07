import Link from "next/link";
import Head from "next/head";
import { useDispatch } from "react-redux";

import Layout from "../components/Layout";
import Input from "../components/Input";
import useInput from "../lib/useInput";
import { thunkSignup } from "../redux/userStore/thunkActionCreators";
import { withRedux } from "../redux/redux";

function SignUp() {
  const dispatch = useDispatch();
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const [username, setUsername] = useInput();
  const [phonenumber, setPhonenumber] = useInput();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const credentials = {
      email,
      password,
      username,
      phonenumber,
    };
    dispatch(thunkSignup(credentials));
  };
  return (
    <Layout disable={true}>
      <Head>
        <title>Sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <h3>Sign up</h3>
          <form onSubmit={formSubmitHandler}>
            <Input
              title="Username"
              placeholder="username"
              type="text"
              required={true}
              value={username}
              onChange={setUsername}
            />
            <Input
              value={email}
              title="Email"
              placeholder="email"
              type="email"
              required={true}
              onChange={setEmail}
            />
            <Input
              title="Password"
              placeholder="password"
              type="password"
              required={true}
              value={password}
              onChange={setPassword}
            />
            <Input
              title="Phonenumber"
              placeholder="phonenumber"
              type="text"
              required={true}
              value={phonenumber}
              onChange={setPhonenumber}
            />
            <button type="submit">Sign up</button>
          </form>
          <div className="existing-user">
            Already have an account?{" "}
            <Link href="/login" as="/login">
              <a>Login</a>
            </Link>
          </div>
        </div>
        <div className="backtohome">
          Back to{" "}
          <Link href="/" as="/">
            <a>Home</a>
          </Link>
        </div>
      </main>
      <style jsx>
        {`
          main {
            height: 100vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 19rem;
            padding: 0.9rem 0.5rem;
            justify-content: center;
          }
          .container form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .container button {
            width: 100%;
            height: 3rem;
            padding: 0.8rem 0.4rem;
            border-radius: 6px;
            border: none;
            background: var(--primary);
            color: white;
            font-weight: bold;
            font-size: 0.9rem;
          }
          .container button:hover {
            cursor: pointer;
          }
          .existing-user,
          .backtohome {
            font-family: "lato", sans-serif;
            margin: 0.5rem 0;
            font-size: 0.9rem;
          }
          .existing-user a {
            text-decoration: none;
          }
          .backtohome a,
          .existing-user a {
            color: #0070f3;
          }
          .backtohome a:hover,
          .existing-user a:hover {
            cursor: pointer;
          }
          .backtohome {
            letter-spacing: 0.5px;
            font-size: 1.8rem;
          }
        `}
      </style>
    </Layout>
  );
}

export default withRedux(SignUp);
