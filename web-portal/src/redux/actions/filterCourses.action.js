import { createAction } from "@reduxjs/toolkit";
import { FILTER_ACTION, REQUEST } from "redux/constants";

export const getFilterSortBy = createAction(REQUEST(FILTER_ACTION.SORT_BY));
export const getFilterRatings = createAction(REQUEST(FILTER_ACTION.RATINGS));
export const getFilterVideoDuration = createAction(
  REQUEST(FILTER_ACTION.VIDEO_DURATION)
);
export const getFilterTopic = createAction(REQUEST(FILTER_ACTION.TOPIC));
export const getFilterSubCategory = createAction(
  REQUEST(FILTER_ACTION.SUB_CATEGORY)
);
export const getFilterPrice = createAction(REQUEST(FILTER_ACTION.PRICE));
