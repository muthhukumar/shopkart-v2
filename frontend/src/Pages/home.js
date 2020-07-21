import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Home.css";
import ProductCard from "../components/Home/ProductCard";
import {
  thunkAddToFav,
  thunkAddToCart,
  thunkGetProducts,
  thunkRemoveItemFromFav,
  thunkRemoveItemFromCart,
} from "../redux/productStore/thunkActionCreators";
import {
  loadingAction,
  NotifyAction,
} from "../redux/ErrorHandlerStore/actionCreators";

function Home() {
  const history = useHistory();

  const data = useSelector((state) => {
    return state.product.products;
  });

  const token = useSelector((state) => {
    return state.user.token;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length === 0) {
      dispatch(thunkGetProducts());
    }
  }, [dispatch, data.length]);

  const addToCartHandler = (id) => {
    if (!token) {
      history.push("/login");
      return dispatch(
        NotifyAction("You need to login before adding to the cart")
      );
    }
    dispatch(thunkAddToCart(token, id));
    dispatch(loadingAction());
  };

  const favAddHandler = (id) => {
    if (!token) {
      history.push("/login");
      return dispatch(
        NotifyAction("You need to login before adding to the Favourite")
      );
    }
    dispatch(loadingAction());
    dispatch(thunkAddToFav(token, id));
  };

  const favDeleteHandler = (id, title) => {
    dispatch(loadingAction());
    dispatch(thunkRemoveItemFromFav(token, id, title));
  };

  const productRemoveHandler = (id, title) => {
    dispatch(loadingAction());
    dispatch(thunkRemoveItemFromCart(token, id, title));
  };

  return (
    <div className="home-main-container">
      <div className="home-content_container">
        <div className="product-title">Products</div>
        <div className="product-card">
          {data &&
            data.map((product) => (
              <ProductCard
                token={token}
                key={product._id}
                onFavAdd={favAddHandler}
                onFavRemove={favDeleteHandler}
                onAddToCart={addToCartHandler}
                onProductRemove={productRemoveHandler}
                id={product._id}
                title={product.productName}
                price={product.productPrice}
                imageUrl={product.productUrl}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
