import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./cart.css";
import ProductCard from "../components/Cart/ProductCard";
import { thunkRemoveItemFromCart } from "../redux/productStore/thunkActionCreators";
import { openBackdropAction } from "../redux/ErrorHandlerStore/actionCreators";
import PlaceOrder from "../components/Cart/PlaceOrder";
import { loadingAction } from "../redux/ErrorHandlerStore/actionCreators";

export default function () {
  const [checkIn, setCheckIn] = useState(false);
  const data = useSelector((state) => {
    return [state.product.cart, state.user.token, state.action.isBackdropOpen];
  });

  const [cart, token] = data;

  const dispatch = useDispatch();

  const onRemoveHandler = (id, title) => {
    dispatch(loadingAction());
    dispatch(thunkRemoveItemFromCart(token, id, title));
  };

  const totalPrice = cart.reduce((accumulator, i) => {
    return accumulator + i.productPrice * i.count;
  }, 0);

  const placeOrder = () => {
    setCheckIn(true);
    dispatch(openBackdropAction());
  };

  return (
    <div className={`cart-main-container ${cart.length === 0 && "pad-0"}`}>
      {checkIn && <PlaceOrder onClick={() => setCheckIn(false)} />}
      <div className="cart-products">
        <div className="cart-product-title">
          {cart.length === 0 ? "No products found" : `My Cart(${cart.length})`}
        </div>
        <div className="cart-product-card">
          {cart.length !== 0 &&
            cart.map((product) => (
              <div className="cart-product" key={product._id}>
                <ProductCard
                  token={token}
                  onProductRemove={onRemoveHandler}
                  id={product._id}
                  count={product.count}
                  title={product.productName}
                  price={product.productPrice}
                  imageUrl={product.productUrl}
                />
              </div>
            ))}
        </div>
        {cart.length !== 0 && (
          <div className="place-order">
            <div>
              <span>Total Price </span>:<span> ₹ {totalPrice}</span>
            </div>
            <button onClick={placeOrder}>place order</button>
          </div>
        )}
      </div>
    </div>
  );
}
