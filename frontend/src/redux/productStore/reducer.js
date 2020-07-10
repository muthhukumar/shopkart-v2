import {
  FETCH_PRODUCTS,
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_ITEM_FROM_CART,
  GET_FAV,
  ADD_TO_FAV,
  REMOVE_ITEM_FROM_FAV,
  LOGOUT,
} from "./actionTypes";
const initialState = {
  products: [],
  cart: [],
  fav: [],
  gotFavInitialData: false,
  gotCartInitialData: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };

    case GET_CART:
      return { ...state, ...action.payload };

    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };

    case UPDATE_CART:
      const index = state.cart.findIndex(
        (prod) => prod._id === action.payload._id
      );
      console.log(index);
      const usercart = [...state.cart];
      console.log(usercart[index]);
      usercart[index] = {
        ...action.payload,
      };
      console.log(usercart[index]);
      console.log(usercart[index]);
      return { ...state, cart: [...usercart] };

    case REMOVE_ITEM_FROM_CART:
      const prodcut_id = action.payload;
      const cart = state.cart.filter((product) => product._id !== prodcut_id);
      return { ...state, cart: [...cart] };

    case GET_FAV:
      return { ...state, ...action.payload };

    case ADD_TO_FAV:
      return { ...state, fav: [...state.fav, action.payload] };

    case REMOVE_ITEM_FROM_FAV:
      const id = action.payload;
      const fav = state.fav.filter((favourite) => favourite._id !== id);
      return { ...state, fav: [...fav] };
    case LOGOUT:
      return {
        products: [],
        cart: [],
        fav: [],
      };

    default:
      return state;
  }
};
