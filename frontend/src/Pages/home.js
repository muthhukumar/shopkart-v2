import React, { useEffect } from "react";
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
  };

  const favAddHandler = (id) => {
    dispatch(thunkAddToFav(token, id));
  };

  const favDeleteHandler = (id) => {
    dispatch(thunkRemoveItemFromFav(token, id));
  };

  const productRemoveHandler = (id) => {
    dispatch(thunkRemoveItemFromCart(token, id));
  };

  return (
    <div className="main-container">
      <h1 className="product-title">Products</h1>
      <div className="product-card">
        {data &&
          data.map((product) => (
            <ProductCard
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
  );
}

export default Home;
