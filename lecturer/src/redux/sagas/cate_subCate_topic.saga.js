import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  REQUEST,
  SUCCESS,
  FAIL,
  CATE_SUB_CATE_TOPIC_ACTION,
} from "../constants";
import { API_ENDPOINT } from "../../constants/api";

const api = process.env.REACT_APP_API;

function* getCategoriesSaga(action) {
  try {
    const { page, perPage } = action.payload;
    const result = yield axios.get(
      `${api}${API_ENDPOINT.CATEGORIES}?page=${page}&perPage=${perPage}`
    );

    yield put({
      type: SUCCESS(CATE_SUB_CATE_TOPIC_ACTION.GET_CATEGORIES),
      payload: {
        data: result.data.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REQUEST(CATE_SUB_CATE_TOPIC_ACTION.GET_CATEGORIES)),
      payload: {
        error: "Error get categories",
      },
    });
  }
}
function* getSubCategoriesSaga(action) {
  try {
    const { page, perPage, categoryUuid } = action.payload;

    const result = yield axios.get(
      `${api}${API_ENDPOINT.SUB_CATEGORIES}?page=${page}&perPage=${perPage}&categoryUuid=${categoryUuid}`
    );

    yield put({
      type: SUCCESS(CATE_SUB_CATE_TOPIC_ACTION.GET_SUB_CATEGORIES),
      payload: {
        data: result.data.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REQUEST(CATE_SUB_CATE_TOPIC_ACTION.GET_SUB_CATEGORIES)),
      payload: {
        error: "Error get subCategories",
      },
    });
  }
}
function* getTopicsSaga(action) {
  try {
    const { page, perPage, subCategoryUuid } = action.payload;
    const result = yield axios.get(
      `${api}${API_ENDPOINT.TOPICS}?page=${page}&perPage=${perPage}&subCategoryUuid=${subCategoryUuid}`
    );

    yield put({
      type: SUCCESS(CATE_SUB_CATE_TOPIC_ACTION.GET_TOPICS),
      payload: {
        data: result.data.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REQUEST(CATE_SUB_CATE_TOPIC_ACTION.GET_TOPICS)),
      payload: {
        error: "Error get TOPICS",
      },
    });
  }
}
export default function* courseSage() {
  yield takeEvery(
    REQUEST(CATE_SUB_CATE_TOPIC_ACTION.GET_CATEGORIES),
    getCategoriesSaga
  );
  yield takeEvery(
    REQUEST(CATE_SUB_CATE_TOPIC_ACTION.GET_SUB_CATEGORIES),
    getSubCategoriesSaga
  );
  yield takeEvery(
    REQUEST(CATE_SUB_CATE_TOPIC_ACTION.GET_TOPICS),
    getTopicsSaga
  );
}
