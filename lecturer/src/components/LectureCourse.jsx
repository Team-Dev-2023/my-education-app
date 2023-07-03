import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillCheckCircle,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
const props = {
  action: "http://127.0.0.1:10005/api/education/file-uploader/video",
  listType: "picture",
  previewFile(file) {
    console.log("Your upload file:", file);
    // Your process logic. Here we just mock to the same file
    return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
      method: "POST",
      body: file,
    })
      .then((res) => res.json())
      .then(({ thumbnail }) => thumbnail);
  },
};
function LectureCourse({
  section,
  indexSectionEdit,
  lecture,
  position,
  listSectionPut,
  setListSectionPut,
}) {
  const [isEditLecture, setIsEditLecture] = useState(false);
  const [isShowMoreContent, setIsShowMoreContent] = useState(false);

  const [listSectionEdit, setListSectionEdit] = useState(listSectionPut);
  const [lectureEdit, setLectureEdit] = useState(lecture);
  const [indexLectureEdit, setIndexLectureEdit] = useState();

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
          <div className="flex justify-between p-4">
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
            <div onClick={() => setIsShowMoreContent(!isShowMoreContent)}>
              {isShowMoreContent ? <AiFillCaretUp /> : <AiFillCaretDown />}
            </div>
          </div>
          {isShowMoreContent ? (
            <div className="p-4 border-t-[0.8px] border-black">
              {lecture.video ? (
                <div className="flex justify-between p-4 text-[#2239e8]">
                  <p>video</p> <AiFillDelete />
                </div>
              ) : (
                <div className="w-fit p-2 border-[0.8px] border-black mt-4">
                  + Upload video{" "}
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </div>
              )}
              {lecture.description ? (
                <div className="mt-4 flex gap-2">
                  <p className="font-[700]">Description:</p>{" "}
                  {lecture.description}
                </div>
              ) : (
                <div className="w-fit p-2 border-[0.8px] border-black my-2">
                  + Description lecture
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}

export default LectureCourse;
