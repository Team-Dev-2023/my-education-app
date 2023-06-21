import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";
import { API_ENDPOINT } from "../../constants/api";

const api = process.env.REACT_APP_API;

function* loginSaga(action) {
  try {
    const { data, callBack } = action.payload;
    const result = yield axios.post(`${api}${API_ENDPOINT.LOGIN}`, data);
    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data,
      },
    });
    yield callBack(result.data.accessToken);
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        error: "Username or password is incorrect",
      },
    });
  }
}
function* getInfoUserSaga(action) {
  try {
    const { accessTokenLocal } = action.payload;
    const result = yield axios.get(
      `http://127.0.0.1:3000/api/education/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenLocal}`,
        },
      }
    );
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
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getInfoUserSaga);
}
