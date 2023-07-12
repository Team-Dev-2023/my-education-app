import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { CART_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";
import { API_ENDPOINT } from "../../constants/api";

const api = process.env.REACT_APP_API;

function* getListCartSaga(action) {
  try {
    const { accessToken } = action.payload;
    console.log("ác", accessToken);
    const result = yield axios.get(`${api}${API_ENDPOINT.LIST_CART}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    yield put({
      type: SUCCESS(CART_ACTION.GET_LIST_CART),
      payload: {
        data: result.data.data,
      },
    });
  } catch (e) {
    console.log("e", e);
    yield put({
      type: FAIL(CART_ACTION.GET_LIST_CART),
      payload: {
        error: " get list cart is error",
      },
    });
  }
}
export default function* authSaga() {
  yield takeEvery(REQUEST(CART_ACTION.GET_LIST_CART), getListCartSaga);
}
