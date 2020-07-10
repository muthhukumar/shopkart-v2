import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import Navigation from "./components/Navigation";
import Cart from "./Pages/cart";
import Home from "./Pages/home";
import Favourites from "./Pages/favourites";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { thunkAutoLogin } from "./redux/userStore/thunkActionCreators";
import {
  thunkgetFav,
  thunkGetCart,
} from "./redux/productStore/thunkActionCreators";
import Fallback from "./components/fallback";
import ErrorModal from "./components/ErrorModal";

function App() {
  const data = useSelector((state) => {
    return [
      state.user.token,
      state.product.gotFavInitialData,
      state.product.gotCartInitialData,
      state.product.products,
      state.user.gotInitialData,
      state.action.isNotificationOpen,
    ];
  });
  const [
    token,
    gotFavInitialData,
    gotCartInitialData,
    products,
    gotInitialData,
    isNotificationOpen,
  ] = data;
  let routes;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) dispatch(thunkAutoLogin());
    if (token && (!gotFavInitialData || !gotCartInitialData)) {
      dispatch(thunkgetFav(token));
      dispatch(thunkGetCart(token));
    }
  }, [gotFavInitialData, gotCartInitialData, dispatch, token]);

  if (!gotInitialData && products.length === 0) return <Fallback />;

  if (!token) {
    routes = (
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Redirect to="/home" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/favourite" exact component={Favourites} />
        <Redirect to="/home" />
      </Switch>
    );
  }
  return (
    <Router>
      <Navigation />
      {isNotificationOpen && <ErrorModal />}
      <main>{routes}</main>
    </Router>
  );
}

export default App;
