import { createAction } from "@reduxjs/toolkit";
import { COURSE_ACTION, REQUEST } from "../constants";
export const getCourseAction = createAction(REQUEST(COURSE_ACTION.GET_COURSE));
export const postCourseAction = createAction(
  REQUEST(COURSE_ACTION.POST_COURSE)
);
export const putCourseAction = createAction(REQUEST(COURSE_ACTION.PUT_COURSE));
export const getListCourseAction = createAction(
  REQUEST(COURSE_ACTION.GET_LIST_COURSE)
);
