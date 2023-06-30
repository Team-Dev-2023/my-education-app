import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, COURSE_ACTION } from "../constants";
import { API_ENDPOINT } from "../../constants/api";

const api = process.env.REACT_APP_API;

function* getCourseSaga(action) {
  try {
    const { courseUuid } = action.payload;
    const result = yield axios.get(
      `${api}${API_ENDPOINT.COURSES}/${courseUuid}`
    );
    // yield callback(result.data.accessToken);
    yield put({
      type: SUCCESS(COURSE_ACTION.GET_COURSE),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REQUEST(COURSE_ACTION.GET_COURSE)),
      payload: {
        error: "Invalid register credentials",
      },
    });
  }
}

function* postCourseSaga(action) {
  try {
    const { accessToken, data, callback } = action.payload;

    const result = yield axios.post(`${api}${API_ENDPOINT.COURSES}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    yield put({
      type: SUCCESS(COURSE_ACTION.POST_COURSE),
      payload: {
        data: result.data,
      },
    });
    yield callback(result.data.uuid);
  } catch (e) {
    yield put({
      type: FAIL(COURSE_ACTION.POST_COURSE),
      payload: {
        error: "Post course fail",
      },
    });
  }
}
function* putCourseSaga(action) {
  try {
    const { accessToken, courseUuid, data, callback } = action.payload;

    const result = yield axios.put(
      `${api}${API_ENDPOINT.COURSES}/${courseUuid}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    yield put({
      type: SUCCESS(COURSE_ACTION.PUT_COURSE),
      payload: {
        data: result.data,
      },
    });
    yield callback(result.data.uuid);
  } catch (e) {
    yield put({
      type: FAIL(COURSE_ACTION.PUT_COURSE),
      payload: {
        error: "Put course fail",
      },
    });
  }
}

export default function* courseSage() {
  yield takeEvery(REQUEST(COURSE_ACTION.GET_COURSE), getCourseSaga);
  yield takeEvery(REQUEST(COURSE_ACTION.POST_COURSE), postCourseSaga);
  yield takeEvery(REQUEST(COURSE_ACTION.PUT_COURSE), putCourseSaga);
}
