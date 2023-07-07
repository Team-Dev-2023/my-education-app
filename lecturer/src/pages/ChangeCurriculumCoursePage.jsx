import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getCourse, putCourse } from "utils/helpers/workWithAPI";

import SectionCourse from "components/ChangeCurriculum/SectionCourse";
import SliderBarCreateCourse from "components/SliderBarCreateCourse";
import HeaderChangeContentCourse from "components/HeaderChangeContentCourse";
import AddNewSection from "components/ChangeCurriculum/AddNewSection";

function ChangeCurriculumCoursePage() {
  const { courseUuid } = useParams();

  const accessToken = localStorage.getItem("accessToken");
  const [infoCourse, setInfoCourse] = useState({});
  const [listSectionPut, setListSectionPut] = useState();
  const [isAlertSaveInfoCourseSuccess, setIsAlertSaveInfoCourseSuccess] =
    useState(false);
  const [dataCourse, setDataCourse] = useState();
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
      setListSectionPut(dataCourse.data.sections);
    }
  }, [dataCourse]);

  const renderListSectionPut = (listSectionPut) => {
    return listSectionPut?.map((item, index) => {
      return (
        <SectionCourse
          key={item.uuid}
          section={item}
          listSectionPut={listSectionPut}
          setListSectionPut={setListSectionPut}
        ></SectionCourse>
      );
    });
  };

  useEffect(() => {
    listSectionPut === infoCourse.sections
      ? setIsAllowSaveInfoCourse(false)
      : setIsAllowSaveInfoCourse(true);
  }, [listSectionPut]);

  // PUT COURSE
  const submitEditCurriculum = () => {
    let dataCoursePut = {
      ...infoCourse,
      topicUuid: dataCourse.data.topic.uuid,
      sections: listSectionPut,
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
        handleSubmitForm={submitEditCurriculum}
        isAlertSaveInfoCourseSuccess={isAlertSaveInfoCourseSuccess}
        setIsAlertSaveInfoCourseSuccess={setIsAlertSaveInfoCourseSuccess}
        isAllowSaveInfoCourse={isAllowSaveInfoCourse}
      />

      <div className="max-w-[1340px] w-full flex  my-2 gap-2 p-[32px] mt-[44px] ">
        <SliderBarCreateCourse number={3} />
        <div className="content w-[1027px] shadow-md  ml-[240px]">
          <div className="border-b-[0.8px] p-6  font-[700] text-[24px]">
            Curriculum
          </div>
          <div className="p-6">
            <div className="my-4">
              <p className="my-2 leading-8">
                Start putting together your course by creating sections,
                lectures and practice activities (quizzes, coding exercises and
                assignments). Use your course outline to structure your content
                and label your sections and lectures clearly. If you’re
                intending to offer your course for free, the total length of
                video content must be less than 2 hours.
              </p>
            </div>
            <div className="listCurriculum">
              {renderListSectionPut(listSectionPut)}
            </div>
            <AddNewSection
              listSectionPut={listSectionPut}
              setListSectionPut={setListSectionPut}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeCurriculumCoursePage;
