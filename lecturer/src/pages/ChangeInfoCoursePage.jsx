import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { useParams } from "react-router-dom";

import RichTextEditor from "components/RichTextEditor";
import UploadImage from "components/ChangeInfoCourse/UploadImage";
import NameLecturer from "components/ChangeInfoCourse/NameLecturer";
import FormChangeTopic from "components/FormChangeTopic";
import FormChangeTitleAndSubTitle from "components/ChangeInfoCourse/FormChangeTitleAndSubTitle";
import SliderBarCreateCourse from "components/SliderBarCreateCourse";
import HeaderChangeContentCourse from "components/HeaderChangeContentCourse";
import { getCourse, putCourse } from "utils/helpers/workWithAPI";

function ChangeInfoCoursePage() {
  const { courseUuid } = useParams();
  const accessToken = localStorage.getItem("accessToken");

  const [formInfoCourse] = Form.useForm();

  const [dataCourse, setDataCourse] = useState();
  const [infoCourse, setInfoCourse] = useState({});
  const [descriptionCourse, setDescriptionCourse] = useState();
  const [isAlertSaveInfoCourseSuccess, setIsAlertSaveInfoCourseSuccess] =
    useState(false);
  const [isAllowSaveInfoCourse, setIsAllowSaveInfoCourse] = useState(false);

  //GET DATA_COURSE
  useEffect(() => {
    getCourse(courseUuid, setDataCourse);
  }, []);

  //COVERT DATA_COURSE TO infoCourse,  WHICH CAN PUT TO API
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
      setInfoCourse({
        ...dataSplitted,
        categoryUuid: dataCourse?.data?.category?.uuid,
        subCategoryUuid: dataCourse?.data?.subCategory?.uuid,
        topicUuid: dataCourse?.data?.topic?.uuid,
      });
    }
  }, [dataCourse]);

  useEffect(() => {
    descriptionCourse === infoCourse.description
      ? setIsAllowSaveInfoCourse(false)
      : infoCourse.description && setIsAllowSaveInfoCourse(true);
  }, [descriptionCourse]);

  //PUT COURSE
  const handleSubmitInfoCourse = () => {
    let valueSubmit = formInfoCourse.getFieldValue();
    let dataCoursePut = {
      ...infoCourse,
      description: descriptionCourse,
      topicUuid: valueSubmit.topicUuid,
      subCategoryUuid: valueSubmit.subCategoryUuid,
      categoryUuid: valueSubmit.categoryUuid,
      subTitle: valueSubmit.subTitle,
      title: valueSubmit.title,
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
        formInfoCourse={formInfoCourse}
        infoCourse={infoCourse}
        isAlertSaveInfoCourseSuccess={isAlertSaveInfoCourseSuccess}
        setIsAlertSaveInfoCourseSuccess={setIsAlertSaveInfoCourseSuccess}
        isAllowSaveInfoCourse={isAllowSaveInfoCourse}
      />
      <div className="max-w-[1340px] w-full flex  my-2 gap-2 p-[32px]  mt-[44px] ">
        <SliderBarCreateCourse number={1} />
        <div className="content w-[1027px] shadow-md ml-[240px] ">
          <div className="border-b-[0.8px] px-8 py-[24px] font-[700] text-[24px]">
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
              setIsAllowSaveInfoCourse={setIsAllowSaveInfoCourse}
            />

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
            <p className="text-[12px] ml-4 mt-2 mb-4 font-[400] text-[#6a6f73]">
              Description should have minimum 200 words.
            </p>
            <h4 className="text-[20px] my-2">Basic info</h4>
            <FormChangeTopic
              formInfoCourse={formInfoCourse}
              infoCourse={infoCourse}
              setInfoCourse={setInfoCourse}
              handleSubmitInfoCourse={handleSubmitInfoCourse}
              setIsAllowSaveInfoCourse={setIsAllowSaveInfoCourse}
            />
            <h4 className="text-[20px]">Course image:</h4>
            <UploadImage
              formInfoCourse={formInfoCourse}
              dataCourse={dataCourse}
              setInfoCourse={setInfoCourse}
              handleSubmitInfoCourse={handleSubmitInfoCourse}
              setIsAllowSaveInfoCourse={setIsAllowSaveInfoCourse}
            />
            <NameLecturer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeInfoCoursePage;
