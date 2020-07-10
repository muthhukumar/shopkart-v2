import React from "react";

import "./ProductCard.css";
import { useSelector, useDispatch } from "react-redux";
import { thunkUpdateCart } from "../../redux/productStore/thunkActionCreators";

export default function ({ token, title, price, onFavRemove, id, imageUrl }) {
  const dispatch = useDispatch();
  const count = useSelector((state) => {
    return state.product.cart.filter((prod) => prod._id === id)[0].count;
  });

  const onCounterDecreaseHandler = () => {
    dispatch(thunkUpdateCart({ token, productCount: count - 1, id }));
  };

  const onCounterIncreaseHandler = () => {
    dispatch(thunkUpdateCart({ token, productCount: count + 1, id }));
  };

  return (
    <div className="home-container">
      <div className="product-main_container">
        <img src={imageUrl} alt={title} />
        <div className="bottomContainer">
          <h3 className="productName">{title}</h3>
          <div className="price">${price}</div>
          <div className="buttonContainer">
            <div className="counter-container">
              <button
                className={count === 1 ? "disabled" : null}
                disabled={count === 1}
                onClick={onCounterDecreaseHandler}
              >
                -
              </button>
              {count}
              <button onClick={onCounterIncreaseHandler}>+</button>
            </div>
            <button onClick={onFavRemove.bind(this, id, title)}>remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
