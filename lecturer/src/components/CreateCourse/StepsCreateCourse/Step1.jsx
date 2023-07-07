import React from "react";
import { Form, Radio } from "antd";
import { MdOndemandVideo } from "react-icons/md";
import { MdArticle } from "react-icons/md";

function Step1({ createCourseForm, next }) {
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <h2 className="font-[700] text-[24px]">
        First, let's find out what type of course you're making.
      </h2>

      <Form
        form={createCourseForm}
        onFinish={() => {
          next();
        }}
      >
        <Form.Item
          name="type"
          rules={[
            {
              required: true,
              message: "Please input type of course ",
            },
          ]}
        >
          <Radio.Group size="large" className="flex gap-6">
            <Radio.Button
              className="w-[250px] !h-[250px] flex justify-center items-center !rounded-none"
              value="Video"
            >
              <div className="flex justify-center items-center flex-col gap-3">
                <MdOndemandVideo className="text-[60px]" />
                <h5 className="text-[24px] font-[700]">Course</h5>
                <p className="text-center leading-6">
                  Create rich learning experiences with the help of video
                  lectures, quizzes, coding exercises, etc.
                </p>
              </div>
            </Radio.Button>
            <Radio.Button
              className="w-[250px] !h-[250px] flex justify-center items-center !rounded-none"
              value="Video"
              disabled
            >
              <div className="flex justify-center items-center flex-col gap-3">
                <MdArticle className="text-[60px]" />
                <h5 className="text-[24px] font-[700]">Practice Test</h5>
                <p className="text-center leading-6">
                  Help students prepare for certification exams by providing
                  practice questions.
                </p>
              </div>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Step1;
