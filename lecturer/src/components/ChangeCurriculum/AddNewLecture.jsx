import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
const uuid = require("uuid");

function AddNewLecture({ setSectionEdit, listSectionPut, indexSectionEdit }) {
  function generateUUID() {
    return uuid.v4();
  }
  const [isAddCurriculumItem, setIsAddCurriculumItem] = useState(false);
  const [isAddTitleLecture, setIsAddNewLecture] = useState(false);

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
          position: listSectionPut[indexSectionEdit].lectures.length,
        },
      ],
    });

    setIsAddNewLecture(false);
  };
  return (
    <>
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
    </>
  );
}

export default AddNewLecture;
