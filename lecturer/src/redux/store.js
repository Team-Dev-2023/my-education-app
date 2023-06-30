import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"; //add Library saga

import authReducer from "./reducers/auth.reducer";
import courseReducer from "./reducers/course.reducer";
import cate_subCate_topicReducer from "./reducers/cate_subCate_topic.reducer";

import rootSaga from "./sagas"; //import yield fork for choice saga file
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    cate_subCate_topic: cate_subCate_topicReducer,
  },
  //saga
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false, //offthunk
      serializableCheck: false, //off check warning parameter function
    }),
    sagaMiddleware, //add saga
  ],
});

sagaMiddleware.run(rootSaga); // run file index saga

export { store };
