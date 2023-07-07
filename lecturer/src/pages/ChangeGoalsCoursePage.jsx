import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SliderBarCreateCourse from "components/SliderBarCreateCourse";
import HeaderChangeContentCourse from "components/HeaderChangeContentCourse";
import FormIntendedLearners from "components/FormIntendedLearners";
import { getCourse, putCourse } from "utils/helpers/workWithAPI";

function ChangeGoalsCoursePage() {
  const { courseUuid } = useParams();
  const accessToken = localStorage.getItem("accessToken");

  const [dataCourse, setDataCourse] = useState();

  const [infoCourse, setInfoCourse] = useState({});
  const [courseKnowledgeList, setCourseKnowledgeList] = useState([]);
  const [coursePrerequisiteList, setCoursePrerequisiteList] = useState([]);
  const [targetLearners, setTargetLearners] = useState([]);
  const [isAlertSaveInfoCourseSuccess, setIsAlertSaveInfoCourseSuccess] =
    useState(false);
  const [isAllowSaveInfoCourse, setIsAllowSaveInfoCourse] = useState(false);

  useEffect(() => {
    getCourse(courseUuid, setDataCourse);
  }, []);
  useEffect(() => {
    if (dataCourse) {
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
    }
  }, [dataCourse]);

  useEffect(() => {
    setCourseKnowledgeList(infoCourse.courseKnowledgeList);
    setCoursePrerequisiteList(infoCourse.coursePrerequisiteList);
    setTargetLearners(infoCourse.targetLearners);
  }, [infoCourse]);

  // PUT COURSE
  const handleSubmitForm = () => {
    let dataCoursePut = {
      ...infoCourse,
      topicUuid: dataCourse.data.topic.uuid,
      courseKnowledgeList: courseKnowledgeList,
      coursePrerequisiteList: coursePrerequisiteList,
      targetLearners: targetLearners,
    };
    let callback = () => {
      setIsAlertSaveInfoCourseSuccess(true);
      setIsAllowSaveInfoCourse(false);
    };
    putCourse(accessToken, courseUuid, dataCoursePut, callback);
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-[1400px] w-full ">
      <HeaderChangeContentCourse
        handleSubmitForm={handleSubmitForm}
        isAlertSaveInfoCourseSuccess={isAlertSaveInfoCourseSuccess}
        setIsAlertSaveInfoCourseSuccess={setIsAlertSaveInfoCourseSuccess}
        isAllowSaveInfoCourse={isAllowSaveInfoCourse}
      />
      <div className="max-w-[1340px] w-full flex  my-2 gap-2 p-[32px] mt-[44px] ">
        <SliderBarCreateCourse number={2} />
        <div className="content w-[1027px] shadow-md  ml-[240px]">
          <div className="border-b-[0.8px] px-8 py-[24px] font-[700] text-[24px] ">
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
                handleSubmitForm={handleSubmitForm}
                arrayContent={courseKnowledgeList}
                setArrayContent={setCourseKnowledgeList}
                setIsAllowSaveInfoCourse={setIsAllowSaveInfoCourse}
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
                handleSubmitForm={handleSubmitForm}
                arrayContent={coursePrerequisiteList}
                setArrayContent={setCoursePrerequisiteList}
                setIsAllowSaveInfoCourse={setIsAllowSaveInfoCourse}
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
                handleSubmitForm={handleSubmitForm}
                arrayContent={targetLearners}
                setArrayContent={setTargetLearners}
                setIsAllowSaveInfoCourse={setIsAllowSaveInfoCourse}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeGoalsCoursePage;
