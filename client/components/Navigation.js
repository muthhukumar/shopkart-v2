import { useRouter } from "next/router";
import Link from "next/link";

import { withRedux } from "../redux/redux";
import { useDispatch, useSelector } from "react-redux";

function Navigation() {
  const token = useSelector((state) => {
    return state.user.token;
  });
  const router = useRouter();
  return (
    <div className={`navigation`}>
      <div className="title">ShopKart</div>
      <ul>
        <li>
          <Link href="/" as="/">
            <a
              className={`${
                router.pathname.substring(1) === "" && "highlight"
              }`}
            >
              home
            </a>
          </Link>
        </li>
        {token !== "" && (
          <li>
            <Link href="/cart" as="/cart">
              <a
                className={`${
                  router.pathname.substring(1) === "cart" && "highlight"
                }`}
              >
                cart
              </a>
            </Link>
          </li>
        )}
        {token !== "" && (
          <li>
            <Link href="/favourite" as="/favourite">
              <a
                className={`${
                  router.pathname.substring(1) === "favourite" && "highlight"
                }`}
              >
                favourite
              </a>
            </Link>
          </li>
        )}
        {token === "" && (
          <li>
            <Link href="/signup" as="/signup">
              <a
                className={`${
                  router.pathname.substring(1) === "signup" && "highlight"
                }`}
              >
                signup
              </a>
            </Link>
          </li>
        )}
        {token === "" && (
          <li>
            <Link href="/login" as="/login">
              <a
                className={`${
                  router.pathname.substring(1) === "login" && "highlight"
                }`}
              >
                login
              </a>
            </Link>
          </li>
        )}
      </ul>
      <style jsx>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
          .navigation {
            padding: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            background: var(--light);
            top: 0;
            left: 0;
            min-width: 100%;
            z-index: 1;
            box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
          }
          .navigation ul {
            margin: 0 2rem;
            display: flex;
            padding: 0;
            align-items: center;
            justify-content: space-around;
            list-style: none;
          }
          .title {
            margin: 0;
            margin: 0 2rem;
            font-size: 2rem;
            letter-spacing: 5px;
            color: var(--white);
          }
          .navigation li {
            margin: 0 2rem;
          }
          .highlight {
            border-bottom: 3px solid var(--font-color);
          }
          .navigation a {
            letter-spacing: 1.4px;
            vertical-align: middle;
            text-decoration: none;
            color: var(--white);
            font-family: "Roboto", sans-serif;
            text-transform: uppercase;
            font-size: 0.9rem;
          }
        `}
      </style>
    </div>
  );
}

export default withRedux(Navigation);
