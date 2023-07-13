import { fork } from "redux-saga/effects";

import authSaga from "./auth.saga";
import cartSaga from "./cart.saga";
import filterCoursesSaga from "./filterCourses.saga";

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(cartSaga);
  yield fork(filterCoursesSaga);
}
