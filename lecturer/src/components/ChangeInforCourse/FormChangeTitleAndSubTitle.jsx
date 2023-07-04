import React from "react";
import { Form, Input } from "antd";

function FormChangeTitleAndSubTitle({
  formInfoCourse,
  infoCourse,
  setInfoCourse,
  handleSubmitInfoCourse,
}) {
  return (
    <Form
      form={formInfoCourse}
      onFinish={handleSubmitInfoCourse}
      name="changeTitleAndSubTitle"
      layout={"vertical"}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4",
      }}
      fields={[
        {
          name: "title",
          value: infoCourse?.title,
        },
        {
          name: "subTitle",
          value: infoCourse?.subTitle,
        },
      ]}
    >
      <Form.Item
        label="Course title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input  course title",
          },
        ]}
      >
        <Input
          placeholder="Insert your course title"
          showCount
          onChange={(e) => {
            setInfoCourse({
              ...infoCourse,
              title: e.target.value,
            });
          }}
          maxLength={60}
        />
      </Form.Item>
      <p className="text-[14px] ml-2 mt-2 mb-4">
        Your title should be a mix of attention-grabbing, informative, and
        optimized for search
      </p>
      <Form.Item
        label="Course subtitle"
        name={"subTitle"}
        rules={[
          {
            required: true,
            message: "Please input your course subtitle",
          },
        ]}
      >
        <Input
          placeholder="Insert your course subtitle"
          showCount
          onChange={(e) => {
            setInfoCourse({
              ...infoCourse,
              subTitle: e.target.value,
            });
          }}
          maxLength={120}
        />
      </Form.Item>
    </Form>
  );
}

export default FormChangeTitleAndSubTitle;
