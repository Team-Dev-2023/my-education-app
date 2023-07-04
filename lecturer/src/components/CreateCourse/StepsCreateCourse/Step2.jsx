import React from "react";
import { Form, Input } from "antd";

function Step2({ createCourseForm, setDataCourse, next }) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h2 className="font-[700] text-[24px]">How about a working title?</h2>
      <p>
        It's ok if you can't think of a good title now. You can change it later.
      </p>
      <Form
        form={createCourseForm}
        onFinish={(value) => {
          setDataCourse((prevFormData) => ({
            ...prevFormData,
            ...value,
          }));
          next();
        }}
        className="w-full"
      >
        <Form.Item
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
            maxLength={120}
            className="max-w-[800px] !w-full mt-6 rounded-none !h-[48px] text-[20px]"
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Step2;
