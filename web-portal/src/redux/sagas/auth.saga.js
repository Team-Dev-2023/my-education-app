import { put, takeEvery } from "redux-saga/effects";
import { notification } from "antd";
import axios from "axios";

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";
import { API, API_ENDPOINT } from "../../constants/api";
function* loginSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${API.URL}${API_ENDPOINT.LOGIN}`, data);
    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    console.log("LOGIN FAIL", e);
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        error: "Email hoặc password không đúng",
      },
    });
  }
}

export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
}
