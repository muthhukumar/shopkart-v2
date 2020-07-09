import {
  FETCH_PRODUCTS,
  GET_CART,
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_FAV,
  UPDATE_CART,
  ADD_TO_FAV,
  GET_FAV,
  LOGOUT,
} from "./actionTypes";

export function fetchProductsAction(products) {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
}

export function getCartAction(products) {
  return {
    type: GET_CART,
    payload: { cart: products, gotCartInitialData: true },
  };
}

export function addToCartAction(products) {
  return {
    type: ADD_TO_CART,
    payload: products,
  };
}
export function updateCartAction(productDetails) {
  return {
    type: UPDATE_CART,
    payload: productDetails,
  };
}
export function deleteCartItemAction(id) {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: id,
  };
}
export function addToFavAction(productDetails) {
  return {
    type: ADD_TO_FAV,
    payload: productDetails,
  };
}
export function getFavAction(products) {
  return {
    type: GET_FAV,
    payload: { fav: products, gotFavInitialData: true },
  };
}

export function deleteFavItemAction(id) {
  return {
    type: REMOVE_ITEM_FROM_FAV,
    payload: id,
  };
}

export function productLogoutAction() {
  return {
    type: LOGOUT,
  };
}
