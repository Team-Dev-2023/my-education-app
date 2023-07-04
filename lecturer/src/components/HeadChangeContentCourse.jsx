import { ROUTES } from "constants/routes";
import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function HeadChangeContentCourse({ formInfoCourse, submitForm }) {
  const navigate = useNavigate();
  return (
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
          className="px-4 py-1 bg-slate-400"
          onClick={() => {
            formInfoCourse?.submit();
            submitForm && submitForm();
          }}
        >
          Save
        </button>
        <button className="px-4 py-2 ">
          <AiFillSetting className="text-[28px]" />
        </button>
      </div>
    </div>
  );
}

export default HeadChangeContentCourse;
