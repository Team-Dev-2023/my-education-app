const { createReducer } = require("@reduxjs/toolkit");
const { REQUEST, FILTER_ACTION, SUCCESS, FAIL } = require("redux/constants");

const initialState = {
  sortByFilter: {
    load: false,
    data: "Newest",
    error: "",
  },
  ratingsFilter: {
    load: true,
    data: 0,
    error: "",
  },
  videoDurationFilter: {
    load: false,
    data: [{ min: 0, max: Number.MAX_SAFE_INTEGER }],
    error: "",
  },
  topicFilter: {
    load: false,
    data: [],
    error: "",
  },
  subCategoryFilter: {
    load: false,
    data: [],
    error: "",
  },
  priceFilter: {
    load: false,
    data: [],
    error: "",
  },
};

const filterReducer = createReducer(initialState, {
  // SORT-BY FILTER
  [REQUEST(FILTER_ACTION.SORT_BY)]: (state, action) => ({
    ...state,
    sortByFilter: {
      ...state.sortByFilter,
      load: true,
    },
  }),
  [SUCCESS(FILTER_ACTION.SORT_BY)]: (state, action) => ({
    ...state,
    sortByFilter: {
      ...state.sortByFilter,
      load: false,
      data: action.payload.data,
      error: "",
    },
  }),
  [FAIL(FILTER_ACTION.SORT_BY)]: (state, action) => ({
    ...state,
    sortByFilter: {
      ...state.sortByFilter,
      load: false,
      error: action.payload.error,
    },
  }),
  // RATINGS FILTER
  [REQUEST(FILTER_ACTION.RATINGS)]: (state, action) => ({
    ...state,
    ratingsFilter: {
      ...state.ratingsFilter,
      load: true,
    },
  }),
  [SUCCESS(FILTER_ACTION.RATINGS)]: (state, action) => ({
    ...state,
    ratingsFilter: {
      ...state.ratingsFilter,
      load: false,
      data: action.payload.data,
      error: "",
    },
  }),
  [FAIL(FILTER_ACTION.RATINGS)]: (state, action) => ({
    ...state,
    ratingsFilter: {
      ...state.ratingsFilter,
      load: false,
      error: action.payload.error,
    },
  }),
  // VIDEO DURATION FILTER
  [REQUEST(FILTER_ACTION.VIDEO_DURATION)]: (state, action) => ({
    ...state,
    videoDurationFilter: {
      ...state.videoDurationFilter,
      load: true,
    },
  }),
  [SUCCESS(FILTER_ACTION.VIDEO_DURATION)]: (state, action) => ({
    ...state,
    videoDurationFilter: {
      ...state.videoDurationFilter,
      load: false,
      data: action.payload.data,
      error: "",
    },
  }),
  [FAIL(FILTER_ACTION.VIDEO_DURATION)]: (state, action) => ({
    ...state,
    videoDurationFilter: {
      ...state.videoDurationFilter,
      load: false,
      error: action.payload.error,
    },
  }),
  // TOPIC FILTER
  [REQUEST(FILTER_ACTION.TOPIC)]: (state, action) => ({
    ...state,
    topicFilter: {
      ...state.topicFilter,
      load: true,
    },
  }),
  [SUCCESS(FILTER_ACTION.TOPIC)]: (state, action) => ({
    ...state,
    topicFilter: {
      ...state.topicFilter,
      load: false,
      data: action.payload.data,
      error: "",
    },
  }),
  [FAIL(FILTER_ACTION.TOPIC)]: (state, action) => ({
    ...state,
    topicFilter: {
      ...state.topicFilter,
      load: false,
      error: action.payload.error,
    },
  }),
  // SUB-CATEGORY FILTER
  [REQUEST(FILTER_ACTION.SUB_CATEGORY)]: (state, action) => ({
    ...state,
    subCategoryFilter: {
      ...state.subCategoryFilter,
      load: true,
    },
  }),
  [SUCCESS(FILTER_ACTION.SUB_CATEGORY)]: (state, action) => ({
    ...state,
    subCategoryFilter: {
      ...state.subCategoryFilter,
      load: false,
      data: action.payload.data,
      error: "",
    },
  }),
  [FAIL(FILTER_ACTION.SUB_CATEGORY)]: (state, action) => ({
    ...state,
    subCategoryFilter: {
      ...state.subCategoryFilter,
      load: false,
      error: action.payload.error,
    },
  }),
  // PRICE FILTER
  [REQUEST(FILTER_ACTION.PRICE)]: (state, action) => ({
    ...state,
    priceFilter: {
      ...state.priceFilter,
      load: true,
    },
  }),
  [SUCCESS(FILTER_ACTION.PRICE)]: (state, action) => ({
    ...state,
    priceFilter: {
      ...state.priceFilter,
      load: false,
      data: action.payload.data,
      error: "",
    },
  }),
  [FAIL(FILTER_ACTION.PRICE)]: (state, action) => ({
    ...state,
    priceFilter: {
      ...state.priceFilter,
      load: false,
      error: action.payload.error,
    },
  }),
});

export default filterReducer;
