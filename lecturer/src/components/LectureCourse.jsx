import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
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
  console.log("lectureEdit", lectureEdit);
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
  console.log("aaaaaaaaaaaaaaaaa", listSectionPut);
  return (
    <div
      key={lecture.uuid}
      className="w-full flex flex-col gap-4 p-4 border-[0.8px] border-black"
    >
      {isEditLecture ? (
        <div>
          <form
            form={"editLectureForm"}
            onSubmit={(e) => saveUpdateLecture(e)}
            action=""
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              id="name"
              required
              value={lectureEdit.name}
              onChange={(e) => updateLecture(e)}
              placeholder="Enter a Title"
              className="p-2 w-[400px] border-[0.8px] border-black"
            />
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            <h4>
              What will students be able to do at the end of this section?
            </h4>

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
        <div className="border-[0.8px] border-black p-4">
          <div className="flex gap-4">
            <div>Lecture: {position}</div>
            <div>{lecture.name}</div>
            <button
              onClick={() => {
                setIsEditLecture(true);
              }}
            >
              edit
            </button>
            <button onClick={() => deleteLecture()}>delete</button>
          </div>
          <div>video</div>
          <div>Description:{lecture.description}</div>
        </div>
      )}
    </div>
  );
}

export default LectureCourse;
