export default function ({
  isInCart,
  title,
  price,
  isInFav,
  onCartAdd,
  onFavAdd,
  imageUrl,
}) {
  return (
    <div className="container">
      <button onClick={onFavAdd} className={`fav ${isInFav && "highlight"}`}>
        {!isInFav && <i className="fa fa-heart-o" aria-hidden="true"></i>}
        {isInFav && <i className={`fa fa-heart`} aria-hidden="true"></i>}
      </button>
      <main>
        <img src={imageUrl} alt={title} />
        <div className="bottom-container">
          <h3 className="product-name">{title}</h3>
          <div className="price">${price}</div>
          <div className="button-container">
            <button onClick={onCartAdd}>
              {isInCart ? "add to cart" : "remove from cart"}
            </button>
          </div>
        </div>
      </main>
      <style jsx>{`
        @import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

        .container {
          margin: 0.8rem;
          width: 15rem;
          height: 27rem;
          box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }
        .container button:hover {
          cursor: pointer;
          outline: none;
        }
        .fav {
          align-items: center;
          position: absolute;
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 1rem;
          border: none;
          right: 1rem;
        }
        .highlight {
          background: var(--font-color);
          border: 1px solid white;
        }
        main {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-rows: auto auto;
        }
        main img {
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
        .product-name {
          font-weight: 400;
          letter-spacing: 0.4px;
          vertical-align: middle;
          font-family: "roboto", san-serif;
          text-transform: capitalize;
          color: var(--secondary);
          margin: 0;
        }
        .price {
          margin: 0.5rem 0;
          font-size: 0.9rem;
          color: var(--font-color);
        }
        .bottom-container {
          padding: 0.8rem;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          justify-content: center;
        }
        .button-container {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
        }
        .button-container button {
          margin: 0.1rem 0.3rem;
          padding: 0.3rem 1.1rem;
          border-radius: 4px;
          border: none;
          text-transform: capitalize;
          background: var(--font-color);
          color: white;
        }
      `}</style>
    </div>
  );
}
