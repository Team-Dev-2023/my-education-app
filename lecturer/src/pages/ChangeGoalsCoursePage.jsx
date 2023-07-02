import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import {
  getCourseAction,
  putCourseAction,
  getCategoriesAction,
  getSubCategoriesAction,
  getTopicsAction,
} from "redux/actions";
import { AiFillDelete } from "react-icons/ai";
const uuid = require("uuid");

let formDataClone = [];
function ChangeGoalsCoursePage() {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  const { userInfo } = useSelector((store) => store.auth);

  const { courseUuid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataCourse } = useSelector((store) => store.course);
  const [infoCourse, setInfoCourse] = useState({});
  const [isSubmitGoalsCourse, setIsSubmitGoalsCourse] = useState(false);

  const [courseKnowledgeList, setCourseKnowledgeList] = useState([]);
  const [coursePrerequisiteList, setCoursePrerequisiteList] = useState([]);
  const [courseRecommendationList, setCourseRecommendationList] = useState([]);

  function generateUUID() {
    return uuid.v4();
  }

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
  //gggggggggg
  console.log("courseData", infoCourse);
  const handleInputChange = (nameContain, uuid, value) => {
    if (nameContain === "courseKnowledgeList") {
      const updatedData = courseKnowledgeList.map((item) =>
        item.uuid === uuid ? { ...item, description: value } : item
      );
      setCourseKnowledgeList(updatedData);
    } else if (nameContain === "coursePrerequisiteList") {
      const updatedData = coursePrerequisiteList.map((item) =>
        item.uuid === uuid ? { ...item, description: value } : item
      );

      setCoursePrerequisiteList(updatedData);
    } else if (nameContain === "courseRecommendationList") {
      const updatedData = courseRecommendationList.map((item) =>
        item.uuid === uuid ? { ...item, description: value } : item
      );

      setCourseRecommendationList(updatedData);
    }
  };
  const handleDeleteItem = (nameContain, index) => {
    if (nameContain === "courseKnowledgeList") {
      const updatedData = [...courseKnowledgeList];
      updatedData.splice(index, 1);
      setCourseKnowledgeList(updatedData);
    } else if (nameContain === "coursePrerequisiteList") {
      const updatedData = [...coursePrerequisiteList];
      updatedData.splice(index, 1);
      setCoursePrerequisiteList(updatedData);
    } else if (nameContain === "courseRecommendationList") {
      const updatedData = [...courseRecommendationList];
      updatedData.splice(index, 1);
      setCourseRecommendationList(updatedData);
    }
  };
  const submitForm = () => {
    console.log("courseKnowledgeList", courseKnowledgeList);
    setInfoCourse({
      ...infoCourse,
      topicUuid: dataCourse.data.topic.uuid,
      courseKnowledgeList: courseKnowledgeList,
      coursePrerequisiteList: coursePrerequisiteList,
      courseRecommendationList: courseRecommendationList,
    });
    setIsSubmitGoalsCourse(true);
  };
  // PUT COURSE
  const handleSubmitCourse = () => {
    dispatch(
      putCourseAction({
        accessToken: accessToken,
        courseUuid: courseUuid,
        data: infoCourse,
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
  useEffect(() => {
    isSubmitGoalsCourse && handleSubmitCourse();
  }, [infoCourse]);

  return (
    <div className="flex flex-col justify-center items-center max-w-[1400px] w-full ">
      <div
        className="header w-full h-[56px] px-4 bg-[#1c1d1f] text-white flex justify-between items-center 
      fixed top-0"
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
        <div className="text-[24px] font-[700]">Create your course</div>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-slate-400"
            onClick={() => submitForm()}
          >
            Save
          </button>
          <button className="px-4 py-2 bg-[#e65e35]">Delete</button>
        </div>
      </div>
      <div className="max-w-[1340px] w-full flex  my-2 gap-2 p-[24px] mt-[44px] ">
        <div className="slide-bar w-[240px] fixed left-[24px]">
          <h4 className="font-[700] mb-2">Publish your course</h4>
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
            <div className="p-2">3. Curriculum</div>
            <div className=" p-2">4. Pricing and Promotions</div>
          </div>
        </div>
        <div className="content w-[1027px] shadow-md  ml-[240px]">
          <div className="border-b-[0.8px] px-[48px] py-[24px] font-[700] text-[24px]">
            Intended learners
          </div>
          <div className="p-6">
            <p className="my-2">
              The following descriptions will be publicly visible on your Course
              Landing Page and will have a direct impact on your course
              performance. These descriptions will help learners decide if your
              course is right for them.
            </p>
          </div>
          <div className="p-[24px] flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h5 className="font-[700] text-[24px]">
                What will students learn in your course?
              </h5>
              <p>
                You must enter at least 4 learning objectives or outcomes that
                learners can expect to achieve after completing your course.
              </p>
            </div>
            <form onSubmit={submitForm} className="flex flex-col gap-4">
              {courseKnowledgeList?.map((item, index) => (
                <div key={item.uuid} className="flex items-center gap-4">
                  <input
                    required
                    type="text"
                    maxLength="10"
                    className="border-[0.8px] border-black p-2 w-[600px]"
                    uuid={item.uuid}
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(
                        "courseKnowledgeList",
                        item.uuid,
                        e.target.value
                      )
                    }
                  />
                  <button
                    onClick={(e) => {
                      handleDeleteItem("courseKnowledgeList", index);
                    }}
                  >
                    <AiFillDelete className="text-[20px]" />
                  </button>
                </div>
              ))}
            </form>
            <button
              className="p-2 border-[0.8px] border-black my-4 w-fit text-[#5624d0] font-[700]"
              onClick={() => {
                setCourseKnowledgeList([
                  ...courseKnowledgeList,
                  { uuid: generateUUID(), description: "" },
                ]);
              }}
            >
              Add more to your response
            </button>
          </div>

          <div className="p-[24px] flex flex-col gap-4">
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
            <form onSubmit={submitForm} className="flex flex-col gap-4">
              {coursePrerequisiteList?.map((item, index) => (
                <div key={item.uuid} className="flex items-center gap-4">
                  <input
                    required
                    type="text"
                    maxLength="10"
                    className="border-[0.8px] border-black p-2 w-[600px]"
                    uuid={item.uuid}
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(
                        "coursePrerequisiteList",
                        item.uuid,
                        e.target.value
                      )
                    }
                  />
                  <button
                    onClick={(e) => {
                      handleDeleteItem("coursePrerequisiteList", index);
                    }}
                  >
                    <AiFillDelete className="text-[20px]" />
                  </button>
                </div>
              ))}
            </form>
            <button
              className="p-2 border-[0.8px] border-black my-4 w-fit text-[#5624d0] font-[700]"
              onClick={() => {
                setCoursePrerequisiteList([
                  ...coursePrerequisiteList,
                  { uuid: generateUUID(), description: "" },
                ]);
              }}
            >
              Add more to your response
            </button>
          </div>

          <div className="p-[24px] flex flex-col gap-4">
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
            <form onSubmit={submitForm} className="flex flex-col gap-4">
              {courseRecommendationList?.map((item, index) => (
                <div key={item.uuid} className="flex items-center gap-4">
                  <input
                    required
                    type="text"
                    maxLength="10"
                    className="border-[0.8px] border-black p-2 w-[600px]"
                    uuid={item.uuid}
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(
                        "courseRecommendationList",
                        item.uuid,
                        e.target.value
                      )
                    }
                  />
                  <button
                    onClick={(e) => {
                      handleDeleteItem("courseRecommendationList", index);
                    }}
                  >
                    <AiFillDelete className="text-[20px]" />
                  </button>
                </div>
              ))}
            </form>
            <button
              className="p-2 border-[0.8px] border-black my-4 w-fit text-[#5624d0] font-[700]"
              onClick={() => {
                setCourseRecommendationList([
                  ...courseRecommendationList,
                  { uuid: generateUUID(), description: "" },
                ]);
              }}
            >
              Add more to your response
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeGoalsCoursePage;
