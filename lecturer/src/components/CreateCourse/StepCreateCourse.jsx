import { Button, Steps } from "antd";

import { useState } from "react";

import Step1 from "./StepsCreateCourse/Step1";
import Step2 from "./StepsCreateCourse/Step2";
import Step3 from "./StepsCreateCourse/Step3";

function StepCreateCourse({
  infoCourse,
  setInfoCourse,
  createCourseForm,
  handleSubmitInfoCourse,
}) {
  // FORM STEP
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "First",
      content: <Step1 createCourseForm={createCourseForm} next={next} />,
    },
    {
      title: "Second",
      content: (
        <Step2
          createCourseForm={createCourseForm}
          setInfoCourse={setInfoCourse}
          next={next}
        />
      ),
    },
    {
      title: "Last",
      content: (
        <Step3
          createCourseForm={createCourseForm}
          infoCourse={infoCourse}
          setInfoCourse={setInfoCourse}
          handleSubmitInfoCourse={handleSubmitInfoCourse}
          next={next}
        />
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="max-w-[1200px] w-full">
      <Steps current={current} items={items} />
      <div className="flex justify-center items-center min-h-[400px]">
        {steps[current]?.content}
      </div>
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {current < steps.length - 1 && (
          <Button
            className="rounded-none bg-[#1c1d1f] text-white !text-[40px]
               flex items-center justify-center w-[100px] h-[60px] !hover:text-white"
            onClick={() => {
              createCourseForm.submit();
            }}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            className="rounded-none bg-[#1c1d1f] text-white !text-[40px]
               flex items-center justify-center w-[100px] h-[60px] !hover:text-white"
            onClick={() => {
              createCourseForm.submit();
            }}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            className="rounded-none b text-black !text-[40px] border-black
               flex items-center justify-center w-[100px] h-[60px] !hover:text-white"
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}

export default StepCreateCourse;
