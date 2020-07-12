import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./home.css";
import ProductCard from "../components/Home/ProductCard";
import {
  thunkAddToFav,
  thunkAddToCart,
  thunkGetProducts,
  thunkRemoveItemFromFav,
  thunkRemoveItemFromCart,
} from "../redux/productStore/thunkActionCreators";
import { loadingAction } from "../redux/ErrorHandlerStore/actionCreators";

function Home() {
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
    dispatch(thunkAddToCart(token, id));
    dispatch(loadingAction());
  };

  const favAddHandler = (id) => {
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
