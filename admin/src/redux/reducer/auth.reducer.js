import { createReducer } from "@reduxjs/toolkit";
import { AUTH_ACTION, FAIL, REQUEST, SUCCESS } from "redux/constants";

const initialState = {
  userInfo: {
    data: {},
    error: "",
  },
  loginData: {
    load: false,
    error: "",
  },
  registerData: {
    load: false,
    error: "",
  },
};

const authReducer = createReducer(initialState, {
  // REGISTER
  [REQUEST(AUTH_ACTION.REGISTER)]: (state, action) => ({
    ...state,
    registerData: {
      load: true,
      error: "",
    },
  }),

  [SUCCESS(AUTH_ACTION.REGISTER)]: (state, action) => ({
    ...state,
    userInfo: {
      ...state.userInfo,
      data: action.payload.data,
    },
    registerData: {
      load: false,
      error: "",
    },
  }),
  [FAIL(AUTH_ACTION.REGISTER)]: (state, action) => ({
    ...state,
    registerData: {
      load: false,
      error: action.payload.error,
    },
  }),
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
  // LOGOUT
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
  // GET USER INFO
  [REQUEST(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: true,
        error: "",
      },
    };
  },

  [SUCCESS(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
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
  [FAIL(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
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
