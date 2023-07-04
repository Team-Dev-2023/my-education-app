import { ROUTES } from "constants/routes";
import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postCourseAction } from "redux/actions";

import StepCreateCourse from "components/CreateCourse/StepCreateCourse";

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  const [dataCourse, setDataCourse] = useState({
    title: "",
    subTitle: "",
    description: "",
    imageUrl: "",
    topicUuid: "",
    courseKnowledgeList: [],
    sections: [],
    coursePrerequisiteList: [],
    courseRecommendationList: [],
  });

  //POST COURSE
  const onFinishCreateCourse = (value) => {
    dispatch(
      postCourseAction({
        accessToken: accessToken,
        data: { ...dataCourse, topicUuid: value },
        callback: (courseUuid) => {
          navigate(
            generatePath(ROUTES.LECTURE.CHANGE_INFO_COURSE, {
              courseUuid: courseUuid,
            })
          );
        },
      })
    );
  };

  return (
    <div className=" w-full flex justify-center p-8">
      <StepCreateCourse
        setDataCourse={setDataCourse}
        onFinishCreateCourse={onFinishCreateCourse}
      />
    </div>
  );
};
export default CreateCoursePage;
