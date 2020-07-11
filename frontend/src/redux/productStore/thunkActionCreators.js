import {
  fetchProductsAction,
  getCartAction,
  addToCartAction,
  updateCartAction,
  deleteCartItemAction,
  getFavAction,
  addToFavAction,
  deleteFavItemAction,
} from "./actionCreators";
import { NotifyAction } from "../ErrorHandlerStore/actionCreators";
import { stopLoadingAction } from "../ErrorHandlerStore/actionCreators";

const URL = process.env.REACT_APP_SERVER_URL;

export function thunkGetProducts() {
  return async function (dispatch) {
    let response, data;

    try {
      response = await fetch(URL + "/products");
      data = await response.json();
      dispatch(fetchProductsAction(data.products));
    } catch (err) {}
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
    } catch (err) {}
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
          productCount: 1,
        }),
      });

      data = await response.json();

      if (!response.ok) throw new Error(data.message);

      const product = data.products.filter((prod) => prod._id === details.id);
      dispatch(NotifyAction(`${product[0].productName} Added to Cart`));
      dispatch(addToCartAction(product[0]));
    } catch (err) {
      if (!err.message) return dispatch(NotifyAction("Something went wrong"));
      dispatch(NotifyAction(err.message));
    }
    dispatch(stopLoadingAction());
  };
}

export function thunkUpdateCart({ id, productCount, token }) {
  return async function (dispatch) {
    let response, data;
    try {
      response = await fetch(URL + "/user/products/", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ productId: id, productCount }),
      });
      data = await response.json();

      if (!response.ok) throw new Error(data.message);

      const product = data.products.filter((prod) => prod._id === id);
      dispatch(updateCartAction(product[0]));
    } catch (err) {
      if (!err.message) return dispatch(NotifyAction("Something went wrong"));
      dispatch(NotifyAction(err.message));
    }
  };
}

export function thunkRemoveItemFromCart(token, id, title) {
  return async function (dispatch) {
    let response, data;
    try {
      response = await fetch(URL + "/user/products/" + id, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      data = await response.json();

      if (!response.ok) throw new Error(data.message);

      dispatch(NotifyAction(title + " removed from Cart"));
      dispatch(deleteCartItemAction(id));
    } catch (err) {
      if (!err.message) return dispatch(NotifyAction("Something went wrong"));
      dispatch(NotifyAction(err.message));
    }
    dispatch(stopLoadingAction());
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
    } catch (err) {}
  };
}

export function thunkAddToFav(token, details) {
  return async function (dispatch) {
    let response, data;
    try {
      response = await fetch(URL + "/user/products/favourites/" + details.id, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      data = await response.json();

      if (!response.ok) throw new Error(data.message);

      const {
        title: productName,
        price: productPrice,
        imageUrl: productUrl,
        id: _id,
      } = details;
      dispatch(NotifyAction(`${productName} added to Favourites`));
      dispatch(addToFavAction({ productPrice, productName, productUrl, _id }));
    } catch (err) {
      if (!err.message) return dispatch(NotifyAction("Something went wrong"));
      dispatch(NotifyAction(err.message));
    }
    dispatch(stopLoadingAction());
  };
}

export function thunkRemoveItemFromFav(token, id, title) {
  return async function (dispatch) {
    let response, data;
    try {
      response = await fetch(URL + "/user/products/favourites/" + id, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      data = await response.json();

      if (!response.ok) throw new Error(data.message);

      dispatch(NotifyAction(title + " removed from Favourites"));
      dispatch(deleteFavItemAction(id));
    } catch (err) {
      if (!err.message) return dispatch(NotifyAction("Something went wrong"));
      dispatch(NotifyAction(err.message));
    }
    dispatch(stopLoadingAction());
  };
}
