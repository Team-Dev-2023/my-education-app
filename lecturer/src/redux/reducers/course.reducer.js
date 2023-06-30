import { createReducer } from "@reduxjs/toolkit";

import { COURSE_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  listCourse: {
    data: {},
    error: "",
  },
  dataCourse: {
    data: {},
    error: "",
  },
  postCourse: {
    data: {},
    error: "",
  },
  putCourse: {
    data: {},
    error: "",
  },
};

const courseReducer = createReducer(initialState, {
  // GET COURSE
  [REQUEST(COURSE_ACTION.GET_COURSE)]: (state, action) => ({
    ...state,
    course: {
      load: true,
      error: "",
    },
  }),

  [SUCCESS(COURSE_ACTION.GET_COURSE)]: (state, action) => ({
    ...state,
    dataCourse: {
      ...state.dataCourse,
      data: action.payload.data,
      load: false,
      error: "",
    },
  }),
  [FAIL(COURSE_ACTION.GET_COURSE)]: (state, action) => ({
    ...state,
    dataCourse: {
      load: false,
      error: action.payload.error,
    },
  }),
  // POST COURSE
  [REQUEST(COURSE_ACTION.POST_COURSE)]: (state, action) => ({
    ...state,
    postCourse: {
      load: true,
      error: "",
    },
  }),

  [SUCCESS(COURSE_ACTION.POST_COURSE)]: (state, action) => ({
    ...state,
    postCourse: {
      ...state.postCourse,
      data: action.payload.data,
      load: false,
      error: "",
    },
  }),
  [FAIL(COURSE_ACTION.POST_COURSE)]: (state, action) => ({
    ...state,
    postCourse: {
      load: false,
      error: action.payload.error,
    },
  }),
  // PUT COURSE
  [REQUEST(COURSE_ACTION.PUT_COURSE)]: (state, action) => ({
    ...state,
    putCourse: {
      load: true,
      error: "",
    },
  }),

  [SUCCESS(COURSE_ACTION.PUT_COURSE)]: (state, action) => ({
    ...state,
    putCourse: {
      ...state.putCourse,
      data: action.payload.data,
      load: false,
      error: "",
    },
  }),
  [FAIL(COURSE_ACTION.PUT_COURSE)]: (state, action) => ({
    ...state,
    putCourse: {
      load: false,
      error: action.payload.error,
    },
  }),
  // GET LIST COURSE
  [REQUEST(COURSE_ACTION.GET_LIST_COURSE)]: (state, action) => ({
    ...state,
    listCourse: {
      load: true,
      error: "",
    },
  }),

  [SUCCESS(COURSE_ACTION.GET_LIST_COURSE)]: (state, action) => ({
    ...state,
    listCourse: {
      ...state.listCourse,
      data: action.payload.data,
      load: false,
      error: "",
    },
  }),
  [FAIL(COURSE_ACTION.GET_LIST_COURSE)]: (state, action) => ({
    ...state,
    listCourse: {
      load: false,
      error: action.payload.error,
    },
  }),
});

export default courseReducer;
