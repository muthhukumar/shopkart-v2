import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Home.css";
import ProductCard from "../components/Cart/ProductCard";
import { thunkRemoveItemFromCart } from "../redux/productStore/thunkActionCreators";

export default function () {
  const data = useSelector((state) => {
    return [state.product.cart, state.user.token];
  });

  const [cart, token] = data;

  const dispatch = useDispatch();

  const onRemoveHandler = (id, title) => {
    dispatch(thunkRemoveItemFromCart(token, id, title));
  };

  return (
    <div className="main-container">
      <h1 className="product-title">
        {cart.length === 0 ? "No products found" : "Products"}
      </h1>
      <div className="product-card">
        {cart.length !== 0 &&
          cart.map((product) => (
            <ProductCard
              token={token}
              onFavRemove={onRemoveHandler}
              id={product._id}
              key={product._id}
              count={product.count}
              title={product.productName}
              price={product.productPrice}
              imageUrl={product.productUrl}
            />
          ))}
      </div>
    </div>
  );
}
