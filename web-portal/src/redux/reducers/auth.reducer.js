import { createReducer } from "@reduxjs/toolkit";

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  userInfo: {
    data: {},
    error: "",
  },
  loginData: {
    load: false,
    error: "",
  },
};

const authReducer = createReducer(initialState, {
  // LOGIN
  [REQUEST(AUTH_ACTION.LOGIN)]: (state, action) => {
    return {
      ...state,
      loginData: {
        load: true,
        error: "",
      },
    };
  },
  [SUCCESS(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      loginData: {
        ...state.loginData,
        load: false,
      },
    };
  },
  [FAIL(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      loginData: {
        load: false,
        error: error,
      },
    };
  },
  //LOGOUT
  [REQUEST(AUTH_ACTION.LOGOUT)]: (state, action) => {
    localStorage.removeItem("accessToken");
    return {
      ...state,
      userInfo: {
        data: {},
        error: "",
      },
    };
  },
  //GET INFO USER
  [REQUEST(AUTH_ACTION.GET_INFO_USER)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: true,
        error: "",
      },
    };
  },

  [SUCCESS(AUTH_ACTION.GET_INFO_USER)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: data,
        load: false,
      },
    };
  },
  [FAIL(AUTH_ACTION.GET_INFO_USER)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        load: false,
        error: error,
      },
    };
  },
});

export default authReducer;
