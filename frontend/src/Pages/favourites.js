import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "./favourites.css";
import ProductCard from "../components/Favourites/ProductCard";
import { thunkRemoveItemFromFav } from "../redux/productStore/thunkActionCreators";
import { loadingAction } from "../redux/ErrorHandlerStore/actionCreators";

export default function () {
  const data = useSelector((state) => {
    return [state.product.fav, state.user.token];
  });

  const [fav, token] = data;

  const dispatch = useDispatch();

  const onRemoveHandler = (id, title) => {
    dispatch(loadingAction());
    dispatch(thunkRemoveItemFromFav(token, id, title));
  };

  return (
    <div className={`fav-main-container ${fav.length === 0 && "pad-0"}`}>
      <div className="fav-products">
        <div className="fav-product-title">
          {fav.length === 0 ? "No Favourites found" : "My Favourites"}
        </div>
        <div className="fav-product-card">
          {fav.length !== 0 &&
            fav.map((product) => (
              <div className="fav-product" key={product._id}>
                <ProductCard
                  onFavRemove={onRemoveHandler}
                  id={product._id}
                  title={product.productName}
                  price={product.productPrice}
                  imageUrl={product.productUrl}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
