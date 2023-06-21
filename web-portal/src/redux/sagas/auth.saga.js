import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";
import { API_ENDPOINT } from "../../constants/api";

const api = process.env.REACT_APP_API;

function* loginSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${api}${API_ENDPOINT.LOGIN}`, data);

    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        error: "Email hoặc password không đúng",
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(`${api}${API_ENDPOINT.REGISTER}`, data);

    yield localStorage.setItem("accessToken", result.data.accessToken);

    yield put({
      type: REQUEST(AUTH_ACTION.REGISTER),
      payload: {
        data: result.data,
      },
    });
    yield callback();
  } catch (e) {
    yield put({
      type: FAIL(REQUEST(AUTH_ACTION.REGISTER)),
      payload: {
        error: "Invalid register credentials",
      },
    });
  }
}

export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga);
}
