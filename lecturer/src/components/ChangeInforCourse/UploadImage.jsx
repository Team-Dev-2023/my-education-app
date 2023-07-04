import React, { useEffect, useState } from "react";
import { Form, Upload } from "antd";
import ImgCrop from "antd-img-crop";

const api = process.env.REACT_APP_API;

function UploadImage({
  dataCourse,
  setInfoCourse,
  formInfoCourse,
  handleSubmitInfoCourse,
}) {
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    setFileList(
      dataCourse?.data?.imageUrl === ""
        ? []
        : [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: `${api}/${dataCourse?.data?.imageUrl}`,
            },
          ]
    );
  }, [dataCourse]);
  //upload file img
  const [imageUrl, setImageUrl] = useState("");
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
    setImageUrl((prevImageUrl) => newFileList.slice(-1)[0]?.response?.url);
    setInfoCourse((prevInfoCourse) => ({
      ...prevInfoCourse,
      imageUrl: newFileList.slice(-1)[0]?.response?.url,
    }));
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Form
      form={formInfoCourse}
      name="uploadFile"
      onFinish={handleSubmitInfoCourse}
      className="my-6"
    >
      <Form.Item label={"Course image"} name={"imageUrl"}>
        <ImgCrop rotationSlider>
          <Upload
            action={`${api}/file-uploader/image`}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && "+ Upload"}
            {fileList.length === 1 && "Change image"}
          </Upload>
        </ImgCrop>
      </Form.Item>
    </Form>
  );
}

export default UploadImage;
