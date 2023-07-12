import { createReducer } from "@reduxjs/toolkit";

import { CART_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  cartData: {
    data: [],
    error: "",
  },
  // postCartData: {
  //   load: false,
  //   error: "",
  // },
  // deleteCartData: {
  //   load: false,
  //   error: "",
  // },
};

const cartReducer = createReducer(initialState, {
  //GET LIST CART
  [REQUEST(CART_ACTION.GET_LIST_CART)]: (state, action) => {
    return {
      ...state,
      cartData: {
        ...state.cartData,
        load: true,
        error: "",
      },
    };
  },

  [SUCCESS(CART_ACTION.GET_LIST_CART)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cartData: {
        ...state.cartData,
        data: data,
        load: false,
      },
    };
  },
  [FAIL(CART_ACTION.GET_LIST_CART)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      cartData: {
        load: false,
        error: error,
      },
    };
  },
});

export default cartReducer;
