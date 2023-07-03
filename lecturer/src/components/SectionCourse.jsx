import React, { useEffect, useState } from "react";
import LectureCourse from "./LectureCourse";
import {
  AiFillCheckCircle,
  AiFillDelete,
  AiFillEdit,
  AiOutlineClose,
} from "react-icons/ai";

const uuid = require("uuid");

function SectionCourse({
  section,
  listSectionPut,
  position,
  setListSectionPut,
}) {
  function generateUUID() {
    return uuid.v4();
  }
  const [isAddCurriculumItem, setIsAddCurriculumItem] = useState(false);
  const [isEditTitleSection, setIsEditTitleSection] = useState(false);
  const [isAddTitleLecture, setIsAddNewLecture] = useState(false);
  const [listSectionEdit, setListSectionEdit] = useState(listSectionPut); //1 list
  const [sectionEdit, setSectionEdit] = useState(section);
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

  //delete 1 section
  const deleteSection = (uuid) => {
    let newArrayDeletedSection = listSectionPut.filter(
      (item) => item.uuid !== uuid
    );
    setListSectionPut(newArrayDeletedSection);
  };

  //onChange input name section >> show change (use setSectionEditShow setListSectionEdit )
  function updateNameSectionInListSection(e) {
    const updatedArray = listSectionEdit.map((item) => {
      if (item.uuid === section.uuid) {
        return { ...item, name: e.target.value };
      }
      return item;
    });
    setSectionEdit({ ...sectionEdit, name: e.target.value });
    setListSectionEdit(updatedArray);
  }
  //submit edit name section
  const saveEditSection = (e) => {
    e.preventDefault();
    setListSectionPut(listSectionEdit);
    setIsEditTitleSection(false);
  };
  //add 1 lecture
  const addNewLecture = (e) => {
    e.preventDefault();
    setSectionEdit({
      ...listSectionPut[indexSectionEdit],
      lectures: [
        ...listSectionPut[indexSectionEdit].lectures,
        {
          uuid: generateUUID(),
          name: e.target.name.value,
          url: "",
          description: "",
          preview: true,
          type: 0,
          videoDuration: 0,
          position: sectionEdit.lectures.length,
        },
      ],
    });

    setIsAddNewLecture(false);
  };
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
          section={sectionEdit}
          indexSectionEdit={indexSectionEdit}
          lecture={item}
          position={index}
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
      {isEditTitleSection ? (
        <div className="Edit title">
          <div>
            <div>
              <form
                form={"editSectionForm"}
                onSubmit={(e, value) => saveEditSection(e, value)}
                action=""
                className="flex flex-col gap-4 w-full"
              >
                <div className="flex gap-2">
                  <div className="mt-2 flex gap-2 ">
                    <AiFillCheckCircle />
                    Section: {position}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="name"
                      required
                      value={sectionEdit.name}
                      onChange={(e) => updateNameSectionInListSection(e)}
                      placeholder="Enter a Title"
                      className="p-2 w-full border-[0.8px] border-black"
                    />
                    <h4 className="mt-4">
                      What will students be able to do at the end of this
                      section?
                    </h4>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    className="p-2 w-fit border-[0.8px] border-black"
                    onClick={() => {
                      setSectionEdit(section);
                      setIsEditTitleSection(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="p-2 w-fit border-[0.8px] border-black"
                    type="submit"
                  >
                    Save section
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full group gap-4 item-center">
          <div className="text-[20px] font-[700]">{position}</div>
          <div className="text-[20px] font-[700]">Unpublished Section:</div>
          <div className="leading-none flex items-center text-center text-[20px]">
            {section.name}
          </div>
          <div className="hidden gap-4 group-hover:flex">
            <button
              onClick={() => {
                setIsEditTitleSection(true);
              }}
            >
              <AiFillEdit />
            </button>
            <button
              onClick={() => {
                deleteSection(section.uuid);
              }}
            >
              <AiFillDelete />
            </button>
          </div>
        </div>
      )}
      <div>{renderListLecture()}</div>
      {isAddTitleLecture && (
        <div className="flex gap-4">
          <div className="mt-2">New Lecture</div>
          <div className="flex-1">
            <form
              form={"addNewLectureForm"}
              onSubmit={(e, value) => addNewLecture(e, value)}
              action=""
              className="w-full flex flex-col gap-4"
            >
              <input
                type="text"
                id="name"
                required
                placeholder="Enter a Title"
                className="p-2 w-full border-[0.8px] border-black"
              />

              <div className="flex justify-end gap-4">
                <button
                  className="p-2 w-fit border-[0.8px] border-black"
                  onClick={() => {
                    // setSectionEditShow(section);
                    setIsAddNewLecture(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="p-2 w-fit border-[0.8px] border-black bg-black text-white"
                  type="submit"
                >
                  Add Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isAddCurriculumItem ? (
        <div
          className="border-dashed  border-black border-[0.8px] 
          p-4 w-[95%] flex justify-between gap-6 text-[#5624d0] font-[700] 
            relative mt-[24px] ml-[24px] bg-white"
        >
          <button
            className="absolute top-[-20px] left-[-15px]"
            onClick={() => {
              setIsAddCurriculumItem(false);
            }}
          >
            <AiOutlineClose className="font-[700]" />
          </button>
          <button
            onClick={() => {
              setIsAddNewLecture(true);
              setIsAddCurriculumItem(false);
            }}
          >
            + Lecture
          </button>
          <button disabled>+ Quiz</button>
          <button>+ Coding Exercise</button>
          <button>+ Coding Exercise</button>
          <button>+ Assignment</button>
        </div>
      ) : (
        <div
          className="w-fit p-2 border-[0.8px] bg-white border-black cursor-pointer"
          onClick={() => setIsAddCurriculumItem(true)}
        >
          + Curriculum item
        </div>
      )}
    </div>
  );
}

export default SectionCourse;
