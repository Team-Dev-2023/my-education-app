import { createReducer } from "@reduxjs/toolkit";

import {
  CATE_SUB_CATE_TOPIC_ACTION,
  REQUEST,
  SUCCESS,
  FAIL,
} from "../constants";

const initialState = {
  categories: {
    data: [],
    load: false,
    error: "",
  },
  subCategories: {
    data: [],
    load: false,
    error: "",
  },
  topics: {
    data: [],
    load: false,
    error: "",
  },
};

const cate_subCate_topic_Reducer = createReducer(initialState, {
  // GET CATEGORIES
  [REQUEST(CATE_SUB_CATE_TOPIC_ACTION.GET_CATEGORIES)]: (state, action) => ({
    ...state,
    categories: {
      load: true,
      error: "",
    },
  }),

  [SUCCESS(CATE_SUB_CATE_TOPIC_ACTION.GET_CATEGORIES)]: (state, action) => ({
    ...state,
    categories: {
      data: action.payload.data,
      load: false,
      error: "",
    },
  }),
  [FAIL(CATE_SUB_CATE_TOPIC_ACTION.GET_CATEGORIES)]: (state, action) => ({
    ...state,
    categories: {
      load: false,
      error: action.payload.error,
    },
  }),
  // GET SUBCATEGORIES
  [REQUEST(CATE_SUB_CATE_TOPIC_ACTION.GET_SUB_CATEGORIES)]: (
    state,
    action
  ) => ({
    ...state,
    subCategories: {
      load: true,
      error: "",
    },
  }),

  [SUCCESS(CATE_SUB_CATE_TOPIC_ACTION.GET_SUB_CATEGORIES)]: (
    state,
    action
  ) => ({
    ...state,
    subCategories: {
      data: action.payload.data,
      load: false,
      error: "",
    },
  }),
  [FAIL(CATE_SUB_CATE_TOPIC_ACTION.GET_SUB_CATEGORIES)]: (state, action) => ({
    ...state,
    subCategories: {
      load: false,
      error: action.payload.error,
    },
  }),
  //GET TOPIC
  [REQUEST(CATE_SUB_CATE_TOPIC_ACTION.GET_TOPICS)]: (state, action) => ({
    ...state,
    topics: {
      load: true,
      error: "",
    },
  }),

  [SUCCESS(CATE_SUB_CATE_TOPIC_ACTION.GET_TOPICS)]: (state, action) => ({
    ...state,
    topics: {
      data: action.payload.data,
      load: false,
      error: "",
    },
  }),
  [FAIL(CATE_SUB_CATE_TOPIC_ACTION.GET_TOPICS)]: (state, action) => ({
    ...state,
    topics: {
      load: false,
      error: action.payload.error,
    },
  }),
});

export default cate_subCate_topic_Reducer;
