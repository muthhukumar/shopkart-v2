import React from "react";

import "./ProductCard.css";
import { useSelector, useDispatch } from "react-redux";
import { thunkUpdateCart } from "../../redux/productStore/thunkActionCreators";

export default function ({
  token,
  title,
  price,
  onProductRemove,
  id,
  imageUrl,
}) {
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
    <div className="cart-card">
      <img src={imageUrl} alt={title} />
      <div className="product-content_container">
        <div className="product-detail">
          <h3 className="productName">{title}</h3>
          <div className="price">₹ {price}</div>
        </div>
        <div className="cart-button_container">
          <div className="count-container">
            <div> Product count</div>
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
          </div>
          <button
            className="remove-btn"
            onClick={onProductRemove.bind(this, id, title)}
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
}
