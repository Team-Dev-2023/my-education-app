import React, { useEffect, useState } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillCheckCircle,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import ShowMoreLecture from "./ShowMoreLecture";

function LectureCourse({
  lectureUuid,
  section,
  indexSectionEdit,
  lecture,
  position,
  listSectionPut,
  setListSectionPut,
  infoCourse,
  setInfoCourse,
}) {
  const [isEditLecture, setIsEditLecture] = useState(false);
  const [isShowMoreContent, setIsShowMoreContent] = useState(false);

  const [listSectionEdit, setListSectionEdit] = useState(listSectionPut);
  const [lectureEdit, setLectureEdit] = useState(lecture);
  const [indexLectureEdit, setIndexLectureEdit] = useState();
  // const [urlVideo, setUrlVideo] = useState("");

  useEffect(() => {
    setListSectionEdit(listSectionPut);
  }, [listSectionPut]);

  //find index lecture in sections
  useEffect(() => {
    let indexLecture = listSectionEdit[indexSectionEdit]?.lectures?.findIndex(
      (itemLecture) => itemLecture.uuid === lecture.uuid
    );
    setIndexLectureEdit(indexLecture);
  }, [listSectionEdit]);

  const deleteLecture = () => {
    let newArrayDeletedLecture = listSectionEdit[
      indexSectionEdit
    ].lectures.filter((item) => item.uuid !== lecture.uuid);
    let newListSectionEdit = [...listSectionPut];
    newListSectionEdit[indexSectionEdit] = {
      ...section,
      lectures: newArrayDeletedLecture,
    };
    setListSectionEdit(newListSectionEdit);
    setListSectionPut(newListSectionEdit);
  };

  //change name lecture
  const updateLecture = (e) => {
    setLectureEdit({ ...lectureEdit, name: e.target.value });
    let a = changeLectureNameByUUID(infoCourse, e.target.value);
    console.log("changeLectureNameByUUID", a);
    setInfoCourse(a);
  };

  const saveUpdateLecture = (e) => {
    e.preventDefault();
    let newListLecture = [...listSectionEdit[indexSectionEdit].lectures];
    newListLecture[indexLectureEdit] = lectureEdit;
    let newListSectionEdit = [...listSectionPut];
    newListSectionEdit[indexSectionEdit] = {
      ...section,
      lectures: newListLecture,
    };
    setListSectionEdit(newListSectionEdit);
    setListSectionPut(newListSectionEdit);
    setIsEditLecture(false);
  };
  // console.log("setListSectionPut", listSectionPut);
  console.log("aaaaaaaaaaaaaaaaaaa", infoCourse);
  function changeLectureNameByUUID(infoCourse, newName) {
    const courseData = JSON.parse(JSON.stringify(infoCourse));

    if (courseData && courseData.sections) {
      for (const section of courseData.sections) {
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

    return courseData;
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
            onSubmit={(e) => saveUpdateLecture(e)}
            action=""
            className="flex flex-col gap-4"
          >
            <div className="flex gap-4">
              <div className="mt-2 flex gap-2">
                <AiFillCheckCircle /> Lecture {position}:
              </div>
              <input
                type="text"
                id="name"
                required
                value={lectureEdit.name}
                onChange={(e) => updateLecture(e)}
                placeholder="Enter a Title"
                className="p-2 flex-1 border-[0.8px] border-black"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="p-2 w-fit border-[0.8px] border-black"
                onClick={() => {
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
                <AiFillCheckCircle /> Lecture {position}:
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
            lectureEdit={lectureEdit}
            setLectureEdit={setLectureEdit}
            isShowMoreContent={isShowMoreContent}
            lecture={lecture}
            // saveUpdateLecture={saveUpdateLecture}
          />
        </div>
      )}
    </div>
  );
}

export default LectureCourse;
