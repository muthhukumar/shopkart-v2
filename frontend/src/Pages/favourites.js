import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Home.css";
import ProductCard from "../components/Favourites/ProductCard";
import { thunkRemoveItemFromFav } from "../redux/productStore/thunkActionCreators";

export default function () {
  const data = useSelector((state) => {
    return [state.product.fav, state.user.token];
  });

  const [fav, token] = data;

  const dispatch = useDispatch();

  const onRemoveHandler = (id) => {
    dispatch(thunkRemoveItemFromFav(token, id));
  };

  return (
    <div className="main-container">
      <h1 className="product-title">
        {fav.length === 0 ? "No Favourites found" : "Favourites"}
      </h1>
      <div className="product-card">
        {fav.length !== 0 &&
          fav.map((product) => (
            <ProductCard
              onFavRemove={onRemoveHandler}
              id={product._id}
              key={product._id}
              title={product.productName}
              price={product.productPrice}
              imageUrl={product.productUrl}
            />
          ))}
      </div>
    </div>
  );
}
