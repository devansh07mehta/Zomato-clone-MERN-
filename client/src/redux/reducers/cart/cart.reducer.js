import {
  GET_CART,
  ADD_TO_CART,
  DELETE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from "./cart.type";

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: action.payload,
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default cartReducer;
