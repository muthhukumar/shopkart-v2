import React from "react";
import "./ProductCard.css";

export default function ({ title, price, onFavRemove, id, imageUrl }) {
  return (
    <div className="fav-card">
      <img src={imageUrl} alt={title} />
      <div className="fav-product-content_container">
        <div className="fav-product-detail">
          <div className="prod-detail_container">
            <h3 className="productName">{title}</h3>
            <div className="price">₹ {price}</div>
          </div>
          <div className="fav-buttonContainer">
            <button onClick={onFavRemove.bind(this, id, title)}>remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
