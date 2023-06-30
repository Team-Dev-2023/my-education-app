import { createAction } from "@reduxjs/toolkit";
import { CATE_SUB_CATE_TOPIC_ACTION, REQUEST } from "../constants";
export const getCategoriesAction = createAction(
  REQUEST(CATE_SUB_CATE_TOPIC_ACTION.GET_CATEGORIES)
);
export const getSubCategoriesAction = createAction(
  REQUEST(CATE_SUB_CATE_TOPIC_ACTION.GET_SUB_CATEGORIES)
);
export const getTopicsAction = createAction(
  REQUEST(CATE_SUB_CATE_TOPIC_ACTION.GET_TOPICS)
);
