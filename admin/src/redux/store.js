import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./reducer/auth.reducer";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializeableCheck: false,
    }),
    sagaMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);

export { store };
