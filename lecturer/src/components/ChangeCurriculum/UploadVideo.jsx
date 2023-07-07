import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload } from "antd";
import createNewListSectionPut from "../../utils/helpers/createNewListSectionPut";

const api = process.env.REACT_APP_API;

function UploadVideo({ lecture, listSectionPut, setListSectionPut }) {
  let uuidLecture = lecture.uuid;

  const updateUrlVideoLecture = (urlVideo) => {
    let urlVideoClone;
    urlVideo === undefined ? (urlVideoClone = "") : (urlVideoClone = urlVideo);
    let newListSectionPut = createNewListSectionPut(
      listSectionPut,
      uuidLecture,
      "url",
      urlVideoClone
    );
    setListSectionPut(newListSectionPut);
  };

  const [fileList, setFileList] = useState(
    lecture.url === ""
      ? []
      : [
          {
            uid: "-1",
            name: "NameVideoApi",
            status: "done",
            url: `${api}/${lecture.url}`,
          },
        ]
  );
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    updateUrlVideoLecture(newFileList.slice(-1)[0]?.response?.url);
  };
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <p className="w-[200px] font-[700]"> Video lecture:</p>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size="large"
      >
        <Upload
          action={`${api}/file-uploader/video`}
          listType="picture"
          onChange={onChange}
          defaultFileList={[...fileList]}
          className="upload-list-inline"
          maxCount={1}
        >
          {fileList.length >= 1 ? (
            <Button icon={<UploadOutlined />}>Replace</Button>
          ) : (
            <Button icon={<UploadOutlined />}>Upload</Button>
          )}
        </Upload>
      </Space>
    </div>
  );
}

export default UploadVideo;
