import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"; //add Library saga

import authReducer from "../redux/reducers/auth.reducer";

import rootSaga from "../redux/sagas"; //import yield fork for choice saga file
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
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
