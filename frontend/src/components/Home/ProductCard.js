import React from "react";
import "./ProductCard.css";
import { useSelector } from "react-redux";

export default function ({
  title,
  token,
  price,
  onProductRemove,
  onFavRemove,
  onAddToCart,
  onFavAdd,
  id,
  imageUrl,
}) {
  const data = useSelector((state) => {
    return [
      state.product.cart.some((items) => items._id === id),
      state.product.fav.some((favs) => favs._id === id),
    ];
  });
  const [isInCart, fav] = data;

  return (
    <div className="home-container">
      {token && (
        <button
          onClick={
            !fav
              ? onFavAdd.bind(this, { id, imageUrl, title, price })
              : onFavRemove.bind(this, id, title)
          }
          className={`home-fav ${fav && "home-highlight"}`}
        >
          {!fav && <i className="fa fa-heart-o" aria-hidden="true"></i>}
          {fav && <i className={`fa fa-heart`} aria-hidden="true"></i>}
        </button>
      )}
      <div className="product-main_container">
        <img src={imageUrl} alt={title} />
        <div className="bottomContainer">
          <h3 className="productName">{title}</h3>
          <div className="price">₹ {price}</div>
          {token && (
            <div className="buttonContainer">
              <button
                className={`${isInCart && "remove-btn"}`}
                onClick={
                  !isInCart
                    ? onAddToCart.bind(this, {
                        id,
                        title,
                        productCount: 1,
                        imageUrl,
                        price,
                      })
                    : onProductRemove.bind(this, id, title)
                }
              >
                {!isInCart ? "Add to Cart" : "remove"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
