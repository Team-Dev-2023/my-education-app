import { createAction } from "@reduxjs/toolkit";
import { AUTH_ACTION, REQUEST } from "../constants";
export const loginAction = createAction(REQUEST(AUTH_ACTION.LOGIN));
export const registerAction = createAction(REQUEST(AUTH_ACTION.REGISTER));
