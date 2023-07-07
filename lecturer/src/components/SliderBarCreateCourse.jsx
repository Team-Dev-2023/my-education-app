import React from "react";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import { ROUTES } from "../constants/routes";

function SliderBarCreateCourse({ number }) {
  const { courseUuid } = useParams();

  const navigate = useNavigate();
  return (
    <div className="slide-bar w-[240px] fixed left-[24px]">
      <h4 className="font-[700] mb-2">Publish your course</h4>
      {number === 1 ? (
        <div className="flex flex-col gap-3">
          <div className="bg-[#c0c5c1] p-2 cursor-pointer">
            1. Course landing page
          </div>
          <div
            className=" p-2 cursor-pointer"
            onClick={() => {
              navigate(
                generatePath(ROUTES.LECTURE.CHANGE_GOALS_COURSE, {
                  courseUuid: courseUuid,
                })
              );
            }}
          >
            2. Intended learners
          </div>
          <div
            className="p-2 cursor-pointer"
            onClick={() => {
              navigate(
                generatePath(ROUTES.LECTURE.CHANGE_CURRICULUM_COURSE, {
                  courseUuid: courseUuid,
                })
              );
            }}
          >
            3. Curriculum
          </div>
          <div
            className=" cursor-pointer p-2"
            onClick={() => {
              navigate(
                generatePath(
                  ROUTES.LECTURE.CHANGE_PRICING_AND_PROMOTIONS_COURSE,
                  {
                    courseUuid: courseUuid,
                  }
                )
              );
            }}
          >
            4. Pricing and Promotions
          </div>
        </div>
      ) : number === 2 ? (
        <div className="flex flex-col gap-3">
          <div
            className=" p-2 cursor-pointer"
            onClick={() => {
              navigate(
                generatePath(ROUTES.LECTURE.CHANGE_INFO_COURSE, {
                  courseUuid: courseUuid,
                })
              );
            }}
          >
            1. Course landing page
          </div>
          <div className="bg-[#c0c5c1] p-2 cursor-pointer">
            2. Intended learners
          </div>
          <div
            className="p-2 cursor-pointer"
            onClick={() => {
              navigate(
                generatePath(ROUTES.LECTURE.CHANGE_CURRICULUM_COURSE, {
                  courseUuid: courseUuid,
                })
              );
            }}
          >
            3. Curriculum
          </div>
          <div
            className=" cursor-pointer p-2"
            onClick={() => {
              navigate(
                generatePath(
                  ROUTES.LECTURE.CHANGE_PRICING_AND_PROMOTIONS_COURSE,
                  {
                    courseUuid: courseUuid,
                  }
                )
              );
            }}
          >
            4. Pricing and Promotions
          </div>
        </div>
      ) : number === 3 ? (
        <div className="flex flex-col gap-3">
          <div
            className=" p-2 cursor-pointer"
            onClick={() => {
              navigate(
                generatePath(ROUTES.LECTURE.CHANGE_INFO_COURSE, {
                  courseUuid: courseUuid,
                })
              );
            }}
          >
            1. Course landing page
          </div>
          <div
            className=" cursor-pointer p-2"
            onClick={() => {
              navigate(
                generatePath(ROUTES.LECTURE.CHANGE_GOALS_COURSE, {
                  courseUuid: courseUuid,
                })
              );
            }}
          >
            2. Intended learners
          </div>
          <div className="bg-[#c0c5c1] p-2 cursor-pointer">3. Curriculum</div>
          <div
            className=" cursor-pointer p-2"
            onClick={() => {
              navigate(
                generatePath(
                  ROUTES.LECTURE.CHANGE_PRICING_AND_PROMOTIONS_COURSE,
                  {
                    courseUuid: courseUuid,
                  }
                )
              );
            }}
          >
            4. Pricing and Promotions
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div
            className=" p-2 cursor-pointer"
            onClick={() => {
              navigate(
                generatePath(ROUTES.LECTURE.CHANGE_INFO_COURSE, {
                  courseUuid: courseUuid,
                })
              );
            }}
          >
            1. Course landing page
          </div>
          <div
            className=" cursor-pointer p-2"
            onClick={() => {
              navigate(
                generatePath(ROUTES.LECTURE.CHANGE_GOALS_COURSE, {
                  courseUuid: courseUuid,
                })
              );
            }}
          >
            2. Intended learners
          </div>
          <div
            className=" cursor-pointer p-2"
            onClick={() => {
              navigate(
                generatePath(ROUTES.LECTURE.CHANGE_CURRICULUM_COURSE, {
                  courseUuid: courseUuid,
                })
              );
            }}
          >
            3. Curriculum
          </div>
          <div className="bg-[#c0c5c1] p-2 cursor-pointer -z-20">
            4. Pricing and Promotions
          </div>
        </div>
      )}
    </div>
  );
}

export default SliderBarCreateCourse;
