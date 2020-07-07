import Head from "next/head";
import Link from "next/link";

import Layout from "../components/Layout";
import Input from "../components/Input";
import useInput from "../lib/useInput";
import { withRedux } from "../redux/redux";
import { thunkLogin } from "../redux/userStore/thunkActionCreators";
import { useDispatch } from "react-redux";

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
    dispatch(thunkLogin(cred));
  };
  return (
    <Layout disable={true}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <h3>Login</h3>
          <form onSubmit={formSubmitHandler}>
            <Input
              title="Email"
              placeholder="email"
              type="email"
              required={true}
              value={email}
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
            <button type="submit">login</button>
          </form>
          <div className="create-account">
            No account?{" "}
            <Link href="/signup" as="/signup">
              <a>create one!</a>
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
            padding-top: 5rem;
            height: 100vh;
            flex-direction: column;
            width: 100%;
            display: flex;
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
          .backtohome,
          .create-account {
            font-family: "lato", sans-serif;
            margin: 0.5rem 0;
            font-size: 0.9rem;
          }
          .create-account a {
            text-decoration: none;
          }
          .backtohome a:hover,
          .create-account a:hover {
            cursor: pointer;
          }
          .backtohome {
            letter-spacing: 0.5px;
            font-size: 1.8rem;
          }
          .backtohome a,
          .create-account a {
            color: #0070f3;
          }
        `}
      </style>
    </Layout>
  );
}

export default withRedux(Login);
