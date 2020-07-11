import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Navigation.css";
import { thunkLogout } from "../redux/userStore/thunkActionCreators";

function Navigation() {
  const [path, setPath] = useState(null);

  const token = useSelector((state) => {
    return state.user.token;
  });

  const productCount = useSelector((state) => {
    return state.product.cart.length;
  });

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup")
      setPath(true);
    else setPath(false);
  }, [location.pathname]);

  const logoutHandler = () => {
    dispatch(thunkLogout());
  };

  if (path) return null;
  return (
    <div className="navigation">
      <div className="nav-title">SHOPcart</div>
      <ul>
        <li>
          <NavLink to="/home">home</NavLink>
        </li>
        {token && (
          <li className="nav-cart">
            <NavLink to="/cart">
              cart <div className="productCount">{productCount}</div>
            </NavLink>
          </li>
        )}
        {token && (
          <li>
            <NavLink to="/favourite">favourite</NavLink>
          </li>
        )}
        {!token && (
          <li>
            <NavLink to="/signup">signup</NavLink>
          </li>
        )}
        {!token && (
          <li>
            <NavLink to="/login">login</NavLink>
          </li>
        )}
        {token && (
          <li>
            <button onClick={logoutHandler}>logout</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
