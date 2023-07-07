import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import AlertSaveInfoCourseSuccess from "../AlertSaveInfoCourseSuccess";

function HeaderChangeContentCourse({
  courseUuid,
  formInfoCourse,
  handleSubmitForm,
  isAlertSaveInfoCourseSuccess,
  setIsAlertSaveInfoCourseSuccess,
  isAllowSaveInfoCourse,
}) {
  const navigate = useNavigate();

  return (
    <>
      <AlertSaveInfoCourseSuccess
        isAlertSaveInfoCourseSuccess={isAlertSaveInfoCourseSuccess}
        setIsAlertSaveInfoCourseSuccess={setIsAlertSaveInfoCourseSuccess}
      />
      <div
        className="header w-full h-[56px] px-4 bg-[#1c1d1f]
         text-white flex justify-between items-center 
      fixed top-0 right-0 z-40"
      >
        <div className="flex gap-4 items-center">
          <button
            onClick={() => {
              navigate(ROUTES.LECTURE.HOME_PAGE);
            }}
          >
            Back to Home
          </button>
        </div>
        <div className="text-[24px] font-[700]">Update your course</div>
        <div className="flex gap-4">
          <button
            className={`px-4 py-1 ${
              isAllowSaveInfoCourse ? "bg-[#a435f0]" : "bg-slate-400"
            } ${
              isAllowSaveInfoCourse
                ? "hover:cursor-pointer"
                : "hover:cursor-not-allowed"
            }`}
            disabled={!isAllowSaveInfoCourse}
            onClick={() => {
              formInfoCourse?.submit();
              handleSubmitForm && handleSubmitForm();
            }}
          >
            Save
          </button>
          <button
            className={`px-4 py-1 bg-[#a435f0]
        `}
            onClick={() => {
              navigate(
                generatePath(ROUTES.LECTURE.PREVIEW_DETAIL_PRODUCT, {
                  uuid: courseUuid,
                })
              );
            }}
          >
            PREVIEW
          </button>
          <button className="px-4 py-2 ">
            <AiFillSetting className="text-[28px]" />
          </button>
        </div>
      </div>
    </>
  );
}

export default HeaderChangeContentCourse;
