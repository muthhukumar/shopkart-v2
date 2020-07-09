import {
  fetchProductsAction,
  getCartAction,
  getFavAction,
  addToFavAction,
  addToCartAction,
  deleteCartItemAction,
  deleteFavItemAction,
} from "./actionCreators";
const URL = process.env.REACT_APP_SERVER_URL;

export function thunkGetProducts() {
  return async function (dispatch) {
    let response, data;

    try {
      response = await fetch(URL + "/products");
      data = await response.json();
      dispatch(fetchProductsAction(data.products));
    } catch (err) {
      console.log(err);
    }
  };
}

export function thunkGetCart(token) {
  return async function (dispatch) {
    let response, data;
    try {
      response = await fetch(URL + "/user/products", {
        credentials: "include",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      data = await response.json();
      dispatch(getCartAction(data.products));
    } catch (err) {
      console.log(err);
    }
  };
}

export function thunkAddToCart(token, details) {
  return async function (dispatch) {
    let response, data;
    try {
      response = await fetch(URL + "/user/products/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          productId: details.id,
          productCount: -1,
        }),
      });

      data = await response.json();
      console.log(data);
      const {
        id: _id,
        title: productName,
        price: productPrice,
        imageUrl: productUrl,
        productCount,
      } = details;
      dispatch(
        addToCartAction({
          _id,
          productName,
          productPrice,
          productUrl,
          productCount,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
}

export function thunkRemoveItemFromCart(token, id) {
  return async function (dispatch) {
    try {
      await fetch(URL + "/user/products/" + id, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(deleteCartItemAction(id));
    } catch (err) {
      console.log(err);
    }
  };
}

export function thunkgetFav(token) {
  return async function (dispatch) {
    let response, data;
    try {
      response = await fetch(URL + "/user/products/favourites", {
        credentials: "include",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      data = await response.json();
      dispatch(getFavAction(data.favourites));
    } catch (err) {
      console.log(err);
    }
  };
}

export function thunkAddToFav(token, details) {
  return async function (dispatch) {
    try {
      await fetch(URL + "/user/products/favourites/" + details.id, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const {
        title: productName,
        price: productPrice,
        imageUrl: productUrl,
        id: _id,
      } = details;
      dispatch(addToFavAction({ productPrice, productName, productUrl, _id }));
    } catch (err) {
      console.log(err);
    }
  };
}

export function thunkRemoveItemFromFav(token, id) {
  return async function (dispatch) {
    try {
      await fetch(URL + "/user/products/favourites/" + id, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(deleteFavItemAction(id));
    } catch (err) {
      console.log(err);
    }
  };
}
