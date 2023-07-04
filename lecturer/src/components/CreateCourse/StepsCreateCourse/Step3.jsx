import React from "react";
import FormChoiceTopic from "../FormChoiceTopic";

function Step3({
  createCourseForm,
  setDataCourse,
  onFinishCreateCourse,
  next,
}) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h2 className="font-[700] text-[24px]">
        What topic best fits the knowledge you'll share?
      </h2>
      <p>If you're not sure about the right topic, you can change it later.</p>
      <FormChoiceTopic
        createCourseForm={createCourseForm}
        setDataCourse={setDataCourse}
        onFinishCreateCourse={onFinishCreateCourse}
        next={next}
      />
    </div>
  );
}

export default Step3;
