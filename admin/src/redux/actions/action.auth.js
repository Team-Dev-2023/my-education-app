import { createAction } from "@reduxjs/toolkit";
import { REQUEST } from "redux/constants";
import { AUTH_ACTION } from "../constants";

export const loginAction = createAction(REQUEST(AUTH_ACTION.LOGIN));
export const logoutAction = createAction(REQUEST(AUTH_ACTION.LOGOUT));
export const registerAction = createAction(REQUEST(AUTH_ACTION.REGISTER));

export const getUserInfoAction = createAction(
  REQUEST(AUTH_ACTION.GET_USER_INFO),
);
