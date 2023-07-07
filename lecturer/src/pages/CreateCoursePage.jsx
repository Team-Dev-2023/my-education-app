import { ROUTES } from "constants/routes";
import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Form } from "antd";

import StepCreateCourse from "components/CreateCourse/StepCreateCourse";
import { postCourse } from "../utils/helpers/workWithAPI";
const CreateCoursePage = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const [infoCourse, setInfoCourse] = useState({
    title: "",
    subTitle: "",
    description: "<p></p>",
    imageUrl: "",
    topicUuid: "",
    courseKnowledgeList: [],
    sections: [],
    coursePrerequisiteList: [],
    courseRecommendationList: [],
  });
  const [createCourseForm] = Form.useForm();

  //POST COURSE
  const handleSubmitInfoCourse = () => {
    let valueSubmit = createCourseForm.getFieldValue();
    let callback = (courseUuid) => {
      navigate(
        generatePath(ROUTES.LECTURE.CHANGE_INFO_COURSE, {
          courseUuid: courseUuid,
        })
      );
    };

    postCourse(
      accessToken,
      {
        ...infoCourse,
        topicUuid: valueSubmit.topicUuid,
      },
      callback
    );
  };
  return (
    <div className=" w-full flex justify-center p-8">
      <StepCreateCourse
        infoCourse={infoCourse}
        setInfoCourse={setInfoCourse}
        createCourseForm={createCourseForm}
        handleSubmitInfoCourse={handleSubmitInfoCourse}
      />
    </div>
  );
};
export default CreateCoursePage;
