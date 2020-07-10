import React from "react";
import "./ProductCard.css";

export default function ({ title, price, onFavRemove, id, imageUrl }) {
  return (
    <div className="home-container">
      <div className="product-main_container">
        <img src={imageUrl} alt={title} />
        <div className="bottomContainer">
          <h3 className="productName">{title}</h3>
          <div className="price">${price}</div>
          <div className="buttonContainer">
            <button onClick={onFavRemove.bind(this, id, title)}>remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
