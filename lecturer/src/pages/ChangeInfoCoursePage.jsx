import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { getCourseAction, putCourseAction } from "redux/actions";
import RichTextEditor from "components/RichTextEditor";

import UploadImage from "components/ChangeInforCourse/UploadImage";
import NameLecturer from "components/ChangeInforCourse/NameLecturer";
import FormChangeTopic from "components/ChangeInforCourse/FormChangeTopic";
import FormChangeTitleAndSubTitle from "components/ChangeInforCourse/FormChangeTitleAndSubTitle";
import SliderBarCreateCourse from "components/SliderBarCreateCourse";
import HeadChangeContentCourse from "components/HeadChangeContentCourse";

function ChangeInfoCoursePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseUuid } = useParams();
  const [formInfoCourse] = Form.useForm();

  const accessToken = localStorage.getItem("accessToken");
  const { dataCourse } = useSelector((store) => store.course);
  const [infoCourse, setInfoCourse] = useState({});
  const [descriptionCourse, setDescriptionCourse] = useState("");

  //GET DATA_COURSE
  useEffect(() => {
    dispatch(getCourseAction({ courseUuid: courseUuid }));
  }, []);

  //COVERT DATA_COURSE TO infoCourse,  WHICH CAN PUT TO API
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
    setInfoCourse({
      ...dataSplitted,
      category: dataCourse?.data?.category?.uuid,
      subCategory: dataCourse?.data?.subCategory?.uuid,
      topic: dataCourse?.data?.topic?.uuid,
    });
  }, [dataCourse]);

  //PUT COURSE
  const handleSubmitInfoCourse = () => {
    let valueSubmit = formInfoCourse.getFieldValue();
    console.log(valueSubmit);
    dispatch(
      putCourseAction({
        accessToken: accessToken,
        courseUuid: courseUuid,
        data: {
          ...infoCourse,
          description: descriptionCourse,
          topicUuid: valueSubmit.topic,
          subCategory: valueSubmit.subCategory,
          category: valueSubmit.category,
          subTitle: valueSubmit.subTitle,
          title: valueSubmit.title,
        },
        callback: (courseUuid) => {
          navigate(
            generatePath(ROUTES.LECTURE.CHANGE_GOALS_COURSE, {
              courseUuid: courseUuid,
            })
          );
        },
      })
    );
  };
  console.log("setInfoCourse", infoCourse);
  return (
    <div className="flex flex-col justify-center items-center max-w-[1400px] w-full ">
      <HeadChangeContentCourse formInfoCourse={formInfoCourse} />
      <div className="max-w-[1340px] w-full flex  my-2 gap-2 p-[32px]  mt-[44px] ">
        <SliderBarCreateCourse number={1} />
        <div className="content w-[1027px] shadow-md ml-[240px] ">
          <div className="border-b-[0.8px] px-[48px] py-[24px] font-[700] text-[24px]">
            Course landing page
          </div>
          <div className="p-8">
            <p className="my-2 leading-6">
              Your course landing page is crucial to your success on Udemy. If
              it’s done right, it can also help you gain visibility in search
              engines like Google. As you complete this section, think about
              creating a compelling Course Landing Page that demonstrates why
              someone would want to enroll in your course. Learn more about
              creating your course landing page and course title standards.
            </p>
            <FormChangeTitleAndSubTitle
              formInfoCourse={formInfoCourse}
              infoCourse={infoCourse}
              setInfoCourse={setInfoCourse}
              handleSubmitInfoCourse={handleSubmitInfoCourse}
            />
            <p className="text-[14px] ml-2 mt-2 mb-4">
              Use 1 or 2 related keywords, and mention 3-4 of the most important
              areas that you've covered during your course.
            </p>
            <span className="text-[20px] flex gap-2 items-center">
              <p className="text-red-500 text-[20px] text-center flex items-center mt-2 leading-[2]">
                *
              </p>
              Course description
            </span>

            <RichTextEditor
              description={infoCourse.description}
              setDescription={setDescriptionCourse}
            ></RichTextEditor>
            <p className="text-[14px] ml-2 mt-2 mb-4">
              Description should have minimum 200 words.
            </p>

            <FormChangeTopic
              formInfoCourse={formInfoCourse}
              infoCourse={infoCourse}
              setInfoCourse={setInfoCourse}
              handleSubmitInfoCourse={handleSubmitInfoCourse}
            />
            <UploadImage
              dataCourse={dataCourse}
              setInfoCourse={setInfoCourse}
              formInfoCourse={formInfoCourse}
              handleSubmitInfoCourse={handleSubmitInfoCourse}
            />

            <NameLecturer />

            <div className="w-full flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => formInfoCourse.submit()}
                className="rounded-none mt-2 bg-[#1c1d1f] text-white !text-[40px]
               flex items-center justify-center w-[100px] h-[60px] !hover:text-white"
              >
                Next step
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeInfoCoursePage;
