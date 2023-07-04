import React, { useState } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillCheckCircle,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import ShowMoreLecture from "./ShowMoreLecture";
import DescriptionLecture from "./DescriptionLecture";

function LectureCourse({
  lectureUuid,
  section,
  lecture,
  indexSectionEdit,
  listSectionPut,
  setListSectionPut,
}) {
  const [isEditLecture, setIsEditLecture] = useState(false);
  const [isShowMoreContent, setIsShowMoreContent] = useState(false);
  const [lectureEdit, setLectureEdit] = useState(lecture);

  const deleteLecture = () => {
    let newArrayDeletedLecture = listSectionPut[
      indexSectionEdit
    ].lectures.filter((item) => item.uuid !== lecture.uuid);
    let newListSectionEdit = [...listSectionPut];
    newListSectionEdit[indexSectionEdit] = {
      ...section,
      lectures: newArrayDeletedLecture,
    };
    setListSectionPut(newListSectionEdit);
  };

  //change name lecture
  const onChangeInputUpdateNameLecture = (e) => {
    setLectureEdit({ ...lectureEdit, name: e.target.value });
  };

  const saveUpdateNameLecture = (e) => {
    e.preventDefault();
    let a = changeLectureNameByUUID(lectureEdit.name);
    console.log("changeLectureNameByUUID", a);
    setListSectionPut(a);
    setIsEditLecture(false);
  };

  function changeLectureNameByUUID(newName) {
    let listSectionPutClone = JSON.parse(JSON.stringify(listSectionPut));
    console.log("listSectionPutClone", listSectionPutClone);
    if (listSectionPutClone) {
      for (const section of listSectionPutClone) {
        if (section.lectures) {
          const lecture = section.lectures.find((l) => l.uuid === lectureUuid);
          console.log("cccccccccccccc", lecture);
          if (lecture) {
            lecture.name = newName;
            break;
          }
        }
      }
    }

    return listSectionPutClone;
  }
  return (
    <div
      key={lecture.uuid}
      className="w-full flex flex-col gap-4 my-2 bg-white"
    >
      {isEditLecture ? (
        <div className="p-4 border-[0.8px] border-black">
          <form
            form={"editLectureForm"}
            onSubmit={(e, value) => saveUpdateNameLecture(e)}
            action=""
            className="flex flex-col gap-4"
          >
            <div className="flex gap-4">
              <div className="mt-2 flex gap-2">
                <AiFillCheckCircle /> Lecture {lecture.position}:
              </div>
              <input
                type="text"
                id="name"
                required
                value={lectureEdit.name}
                onChange={(e) => onChangeInputUpdateNameLecture(e)}
                placeholder="Enter a Title"
                className="p-2 flex-1 border-[0.8px] border-black"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="p-2 w-fit border-[0.8px] border-black"
                onClick={() => {
                  setLectureEdit(lecture);
                  setIsEditLecture(false);
                }}
              >
                Cancel
              </button>
              <button
                className="p-2 w-fit border-[0.8px] border-black"
                type="submit"
              >
                Save Lecture
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="border-[0.8px] border-black ">
          <div
            className="flex justify-between p-4"
            onClick={() => setIsShowMoreContent(!isShowMoreContent)}
          >
            <div className="flex gap-4 w-full group">
              <div className="flex gap-2">
                <AiFillCheckCircle /> Lecture {lecture.position}:
              </div>
              <div>{lecture.name}</div>
              <div className="group-hover:flex gap-4 hidden">
                <button
                  onClick={() => {
                    setIsEditLecture(true);
                  }}
                >
                  <AiFillEdit />
                </button>
                <button onClick={() => deleteLecture()}>
                  <AiFillDelete />
                </button>
              </div>
            </div>
            <div>
              {isShowMoreContent ? <AiFillCaretUp /> : <AiFillCaretDown />}
            </div>
          </div>
          <ShowMoreLecture
            isShowMoreContent={isShowMoreContent}
            lecture={lecture}
            listSectionPut={listSectionPut}
            setListSectionPut={setListSectionPut}
          />
        </div>
      )}
    </div>
  );
}

export default LectureCourse;
