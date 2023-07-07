import React, { useEffect, useState } from "react";
import LectureCourse from "./LectureCourse";
import AddNewLecture from "./AddNewLecture";
import TitleSection from "./TitleSection";

function SectionCourse({ section, listSectionPut, setListSectionPut }) {
  const [indexSectionEdit, setIndexSectionEdit] = useState();

  //find index section in listSection
  useEffect(() => {
    let indexSection = listSectionPut?.findIndex(
      (itemSection) => itemSection.uuid === section.uuid
    );
    setIndexSectionEdit(indexSection);
  }, [listSectionPut]);

  const renderListLecture = () => {
    return listSectionPut[indexSectionEdit]?.lectures.map((item, index) => {
      return (
        <LectureCourse
          key={item.uuid}
          lectureUuid={item.uuid}
          section={section}
          lecture={item}
          indexSectionEdit={indexSectionEdit}
          listSectionPut={listSectionPut}
          setListSectionPut={setListSectionPut}
        ></LectureCourse>
      );
    });
  };
  return (
    <div
      key={section.uuid}
      className="w-full flex flex-col my-4 gap-4 p-4
       border-[0.8px]
      bg-[#f7f9fa]
       border-black"
    >
      <TitleSection
        section={section}
        indexSectionEdit={indexSectionEdit}
        listSectionPut={listSectionPut}
        setListSectionPut={setListSectionPut}
      />

      <div>{renderListLecture()}</div>
      <AddNewLecture
        listSectionPut={listSectionPut}
        setListSectionPut={setListSectionPut}
        indexSectionEdit={indexSectionEdit}
      />
    </div>
  );
}

export default SectionCourse;
