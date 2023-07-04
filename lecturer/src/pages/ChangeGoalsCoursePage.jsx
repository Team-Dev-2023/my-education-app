import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { getCourseAction, putCourseAction } from "redux/actions";
import SliderBarCreateCourse from "components/SliderBarCreateCourse";
import HeadChangeContentCourse from "components/HeadChangeContentCourse";
import FormIntendedLearners from "components/FormIntendedLearners";

function ChangeGoalsCoursePage() {
  const accessToken = localStorage.getItem("accessToken");

  const { courseUuid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataCourse } = useSelector((store) => store.course);
  const [infoCourse, setInfoCourse] = useState({});

  const [courseKnowledgeList, setCourseKnowledgeList] = useState([]);
  const [coursePrerequisiteList, setCoursePrerequisiteList] = useState([]);
  const [courseRecommendationList, setCourseRecommendationList] = useState([]);

  useEffect(() => {
    dispatch(getCourseAction({ courseUuid: courseUuid }));
  }, []);
  useEffect(() => {
    const {
      createdAt,
      createdBy,
      lastUpdatedAt,
      lastUpdatedBy,
      uuid,
      category,
      subCategory,
      topic,
      ...dataSplitted
    } = dataCourse.data;
    setInfoCourse(dataSplitted);
  }, [dataCourse]);
  useEffect(() => {
    setCourseKnowledgeList(infoCourse.courseKnowledgeList);
    setCoursePrerequisiteList(infoCourse.coursePrerequisiteList);
    setCourseRecommendationList(infoCourse.courseRecommendationList);
  }, [infoCourse]);

  // PUT COURSE
  const submitForm = () => {
    dispatch(
      putCourseAction({
        accessToken: accessToken,
        courseUuid: courseUuid,
        data: {
          ...infoCourse,
          topicUuid: dataCourse.data.topic.uuid,
          courseKnowledgeList: courseKnowledgeList,
          coursePrerequisiteList: coursePrerequisiteList,
          courseRecommendationList: courseRecommendationList,
        },
        callback: (courseUuid) => {
          navigate(
            generatePath(ROUTES.LECTURE.CHANGE_CURRICULUM_COURSE, {
              courseUuid: courseUuid,
            })
          );
        },
      })
    );
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-[1400px] w-full ">
      <HeadChangeContentCourse submitForm={submitForm} />
      <div className="max-w-[1340px] w-full flex  my-2 gap-2 p-[32px] mt-[44px] ">
        <SliderBarCreateCourse number={2} />
        <div className="content w-[1027px] shadow-md  ml-[240px]">
          <div className="border-b-[0.8px] px-[48px] py-[24px] font-[700] text-[24px] ">
            Intended learners
          </div>
          <div className="p-8">
            <div className="mb-8">
              <p className="leading-6">
                The following descriptions will be publicly visible on your
                Course Landing Page and will have a direct impact on your course
                performance. These descriptions will help learners decide if
                your course is right for them.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <h5 className="font-[700] text-[24px]">
                  What will students learn in your course?
                </h5>
                <p>
                  You must enter at least 4 learning objectives or outcomes that
                  learners can expect to achieve after completing your course.
                </p>
              </div>

              <FormIntendedLearners
                submitForm={submitForm}
                arrayContent={courseKnowledgeList}
                setArrayContent={setCourseKnowledgeList}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <h5 className="font-[700] text-[24px]">
                  What are the requirements or prerequisites for taking your
                  course?
                </h5>
                <p>
                  List the required skills, experience, tools or equipment
                  learners should have prior to taking your course.
                </p>
                <p>
                  If there are no requirements, use this space as an opportunity
                  to lower the barrier for beginners
                </p>
              </div>

              <FormIntendedLearners
                submitForm={submitForm}
                arrayContent={coursePrerequisiteList}
                setArrayContent={setCoursePrerequisiteList}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <h5 className="font-[700] text-[24px]">
                  Who is this course for?
                </h5>
                <p>
                  Write a clear description of the intended learners for your
                  course who will find your course content valuable.
                </p>
                <p>
                  This will help you attract the right learners to your course.
                </p>
              </div>
              <FormIntendedLearners
                submitForm={submitForm}
                arrayContent={courseRecommendationList}
                setArrayContent={setCourseRecommendationList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeGoalsCoursePage;
