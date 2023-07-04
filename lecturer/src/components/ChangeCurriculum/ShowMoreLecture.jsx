import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const api = process.env.REACT_APP_API;

function ShowMoreLecture({
  lectureEdit,
  setLectureEdit,
  isShowMoreContent,
  lecture,
  saveUpdateLecture,
}) {
  let updateUrlVideo = (value) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaa", value);
    setLectureEdit({
      ...lectureEdit,
      url: value,
    });
    saveUpdateLecture();
  };
  console.log("lectureEditttttttttttttttt", lectureEdit);
  const props = {
    name: "file",
    action: "http://127.0.0.1:10005/api/education/file-uploader/video",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        updateUrlVideo(info.file.response.url);
        message.success(`${info.file.response.url} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
    <>
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
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
          )}
          {lecture.description ? (
            <div className="mt-4 flex gap-2">
              <p className="font-[700]">Description:</p> {lecture.description}
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
    </>
  );
}

export default ShowMoreLecture;
