import React, { useEffect, useState } from "react";
import LectureCourse from "./LectureCourse";

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
    console.log(e.target.name.value);
    setSectionEdit({
      ...listSectionPut[indexSectionEdit],
      lectures: [
        ...listSectionPut[indexSectionEdit].lectures,
        {
          uuid: generateUUID(),
          name: e.target.name.value,
          description: "",
          position: sectionEdit.lectures.length,
          preview: true,
          type: "0",
          videoDuration: "",
          url: "",
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
      className="w-full flex flex-col gap-4 p-4 border-[0.8px] border-black"
    >
      {isEditTitleSection ? (
        <div className="Edit title">
          <div>Section: {position}</div>
          <div>
            <div>
              <form
                form={"editSectionForm"}
                onSubmit={(e, value) => saveEditSection(e, value)}
                action=""
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  id="name"
                  required
                  value={sectionEdit.name}
                  onChange={(e) => updateNameSectionInListSection(e)}
                  placeholder="Enter a Title"
                  className="p-2 w-[400px] border-[0.8px] border-black"
                />
                <h4>
                  What will students be able to do at the end of this section?
                </h4>

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
        <div className="flex gap-4 item-center">
          <div className="text-[20px] font-[700]">{position}</div>
          <div className="text-[20px] font-[700]">Unpublished Section:</div>
          <div> {section.name}</div>
          <button
            onClick={() => {
              setIsEditTitleSection(true);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteSection(section.uuid);
            }}
          >
            Delete
          </button>
        </div>
      )}
      <div>{renderListLecture()}</div>
      {isAddTitleLecture && (
        <div className="flex gap-4">
          <div>New Lecture</div>
          <div>
            <form
              form={"addNewLectureForm"}
              onSubmit={(e, value) => addNewLecture(e, value)}
              action=""
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                id="name"
                required
                placeholder="Enter a Title"
                className="p-2 w-[400px] border-[0.8px] border-black"
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
                  className="p-2 w-fit border-[0.8px] border-black"
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
          className="border-dotted border-black border-[0.8px] p-4 w-fit flex gap-6 text-[#5624d0] font-[700] 
            relative mt-[24px] ml-[24px]"
        >
          <button
            className="absolute top-[-20px] left-[-15px]"
            onClick={() => {
              setIsAddCurriculumItem(false);
            }}
          >
            X
          </button>
          <button
            onClick={() => {
              setIsAddNewLecture(true);
              setIsAddCurriculumItem(false);
            }}
          >
            + Lecture
          </button>
          <button>+ Quiz</button>
          <button>+ Coding Exercise</button>
          <button>+ Coding Exercise</button>
          <button>+ Assignment</button>
        </div>
      ) : (
        <div
          className="w-fit p-2 border-[0.8px] border-black"
          onClick={() => setIsAddCurriculumItem(true)}
        >
          + Curriculum item
        </div>
      )}
    </div>
  );
}

export default SectionCourse;
