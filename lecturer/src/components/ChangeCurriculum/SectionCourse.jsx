import React, { useEffect, useState } from "react";
import LectureCourse from "./LectureCourse";
import AddNewLecture from "./AddNewLecture";
import TitleSection from "./TitleSection";
import DescriptionLecture from "./DescriptionLecture";

function SectionCourse({
  section,
  listSectionPut,
  setListSectionPut,
  // infoCourse,
  // setInfoCourse,
}) {
  const [listSectionEdit, setListSectionEdit] = useState(listSectionPut); //1 list
  const [sectionEdit, setSectionEdit] = useState(section); //section onshow
  const [indexSectionEdit, setIndexSectionEdit] = useState();

  useEffect(() => {
    setListSectionEdit(listSectionPut);
  }, [listSectionPut]);

  //find index section in listSection
  useEffect(() => {
    let indexSection = listSectionEdit?.findIndex(
      (itemSection) => itemSection.uuid === section.uuid
    );
    setIndexSectionEdit(indexSection);
  }, [listSectionEdit]);

  useEffect(() => {
    let newListSectionEdit = [...listSectionEdit];
    newListSectionEdit[indexSectionEdit] = sectionEdit;
    setListSectionEdit(newListSectionEdit);
    setListSectionPut(newListSectionEdit);
  }, [sectionEdit]);

  const renderListLecture = () => {
    return listSectionPut[indexSectionEdit]?.lectures.map((item, index) => {
      return (
        <LectureCourse
          key={item.uuid}
          lectureUuid={item.uuid}
          section={sectionEdit}
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
