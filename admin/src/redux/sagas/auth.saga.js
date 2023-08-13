import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from "redux/constants";

import { API_ENDPOINT } from "constants/api";
const api = process.env.REACT_APP_API;

function* LoginSaga(action) {
  try {
    const { data, callback } = action.payload;
    console.log("datasaga", data);
    const result = yield axios.post(`${api}${API_ENDPOINT.LOGIN}`, data);
    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data,
      },
    });
    yield callback(result.data.accessToken);
  } catch (error) {
    console.log(error);
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        error: "Username or password is incorrect",
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { accessToken } = action.payload;
    const result = yield axios.get(`${api}${API_ENDPOINT.GET_USER_INFO}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.GET_USER_INFO),
      payload: {
        error: " get profile user is error",
      },
    });
  }
}

export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), LoginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getUserInfoSaga);
}
