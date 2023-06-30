import { fork } from "redux-saga/effects";

import authSaga from "./auth.saga";
import courseSage from "./course.saga";
import cate_subCate_topicSaga from "./cate_subCate_topic.saga";

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(courseSage);
  yield fork(cate_subCate_topicSaga);
}
