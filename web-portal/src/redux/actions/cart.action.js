import { createAction } from "@reduxjs/toolkit";
import { CART_ACTION, REQUEST } from "../constants";
export const getListCartAction = createAction(
  REQUEST(CART_ACTION.GET_LIST_CART)
);
export const postItemCartAction = createAction(
  REQUEST(CART_ACTION.POST_ITEM_CART)
);

export const deleteItemCartAction = createAction(
  REQUEST(CART_ACTION.DELETE_ITEM_CART)
);
