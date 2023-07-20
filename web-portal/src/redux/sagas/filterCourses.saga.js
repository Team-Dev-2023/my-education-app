import { put, takeEvery } from "redux-saga/effects";
import { FAIL, FILTER_ACTION, REQUEST, SUCCESS } from "redux/constants";

function* filterSortSaga(action) {
  try {
    const { data } = action.payload;
    yield put({
      type: SUCCESS(FILTER_ACTION.SORT_BY),
      payload: {
        data: data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(FILTER_ACTION.SORT_BY),
      payload: {
        error: `Fail to filter sort-by, ${error}`,
      },
    });
  }
}
function* filterRatingsSaga(action) {
  try {
    const { data } = action.payload;
    yield put({
      type: SUCCESS(FILTER_ACTION.RATINGS),
      payload: {
        data: data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(FILTER_ACTION.RATINGS),
      payload: {
        error: `Fail to filter ratings, ${error}`,
      },
    });
  }
}
function* filterVideoDurationSaga(action) {
  try {
    const { data } = action.payload;
    yield put({
      type: SUCCESS(FILTER_ACTION.VIDEO_DURATION),
      payload: {
        data: data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(FILTER_ACTION.VIDEO_DURATION),
      payload: {
        error: `Fail to filter video duration, ${error}`,
      },
    });
  }
}
function* filterTopicSaga(action) {
  try {
    const { data } = action.payload;
    yield put({
      type: SUCCESS(FILTER_ACTION.TOPIC),
      payload: {
        data: data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(FILTER_ACTION.TOPIC),
      payload: {
        error: `Fail to filter topic, ${error}`,
      },
    });
  }
}
function* filterSubCategorySaga(action) {
  try {
    const { data } = action.payload;
    yield put({
      type: SUCCESS(FILTER_ACTION.SUB_CATEGORY),
      payload: {
        data: data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(FILTER_ACTION.SUB_CATEGORY),
      payload: {
        error: `Fail to filter sub-category, ${error}`,
      },
    });
  }
}
function* filterPriceSaga(action) {
  try {
    const { data } = action.payload;
    yield put({
      type: SUCCESS(FILTER_ACTION.PRICE),
      payload: {
        data: data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(FILTER_ACTION.PRICE),
      payload: {
        error: `Fail to filter price, ${error}`,
      },
    });
  }
}

export default function* filterCoursesSaga() {
  yield takeEvery(REQUEST(FILTER_ACTION.SORT_BY), filterSortSaga);
  yield takeEvery(REQUEST(FILTER_ACTION.RATINGS), filterRatingsSaga);
  yield takeEvery(
    REQUEST(FILTER_ACTION.VIDEO_DURATION),
    filterVideoDurationSaga
  );
  yield takeEvery(REQUEST(FILTER_ACTION.TOPIC), filterTopicSaga);
  yield takeEvery(REQUEST(FILTER_ACTION.SUB_CATEGORY), filterSubCategorySaga);
  yield takeEvery(REQUEST(FILTER_ACTION.PRICE), filterPriceSaga);
}
