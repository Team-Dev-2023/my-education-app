import FormChangeTopic from "components/FormChangeTopic";
import React from "react";

function Step3({
  createCourseForm,
  infoCourse,
  setInfoCourse,
  handleSubmitInfoCourse,
}) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h2 className="font-[700] text-[24px]">
        What topic best fits the knowledge you'll share?
      </h2>
      <p>If you're not sure about the right topic, you can change it later.</p>
      <FormChangeTopic
        formInfoCourse={createCourseForm}
        infoCourse={infoCourse}
        setInfoCourse={setInfoCourse}
        handleSubmitInfoCourse={handleSubmitInfoCourse}
      />
    </div>
  );
}

export default Step3;
