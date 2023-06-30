import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../constants/routes";

import { getCourseAction } from "redux/actions";

let formDataClone = [];
function ChangeGoalsCoursePage() {
  const { courseUuid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseData } = useSelector((store) => store.course);
  const [arrayCourseKnowledge, setArrayCourseKnowledge] = useState([]);
  const [formData, setFormData] = useState(formDataClone);

  //gggggggggg

  const handleInputChange = (uuid, value) => {
    const updatedData = formData.map((item) =>
      item.uuid === uuid ? { ...item, description: value } : item
    );
    setFormData(updatedData);
  };

  const handleSubmit2222 = (e) => {
    e.preventDefault();

    // Xử lý logic khi submit form

    // // Reset form (nếu cần)
    // setFormData([
    //   {
    //     uuid: 11,
    //     valueItem: "a",
    //   },
    //   {
    //     uuid: 22,
    //     valueItem: "b",
    //   },
    //   {
    //     uuid: 33,
    //     valueItem: "c",
    //   },
    // ]);
  };
  //llllllllllllllllllllllll]
  const renderEditData2 = [
    {
      valueItem: "a",
    },
    {
      valueItem: "b",
    },
    {
      valueItem: "c",
    },
  ];
  const [formData2, setFormData2] = useState(renderEditData2);

  const handleInputChange2 = (index, value) => {
    const updatedData = [...formData2];
    updatedData[index].valueItem = value;
    setFormData2(updatedData);
  };

  const handleDeleteItem = (index) => {
    const updatedData = [...formData2];
    updatedData.splice(index, 1);
    setFormData2(updatedData);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    // Xử lý logic khi submit form

    // Reset form (nếu cần)
    // setFormData2(renderEditData2);
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="header w-full h-[56px] px-4 bg-[#1c1d1f] text-white flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => {
              navigate(ROUTES.LECTURE.HOME_PAGE);
            }}
          >
            Back to Home
          </button>
        </div>
        <div className="text-[24px] font-[700]">Create your course</div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-slate-400">Save</button>
          <button className="px-4 py-2 bg-[#e65e35]">Delete</button>
        </div>
      </div>
      <div className="max-w-[1340px] flex my-2 gap-2">
        <div className="slide-bar w-[240px]">
          <h4 className="font-[700] mb-2">Publish your course</h4>
          <div className="flex flex-col gap-3">
            <div>1. Course landing page</div>
            <div className="bg-[#c0c5c1] p-2">2. Intended learners</div>
            <div>3. Curriculum</div>
            <div>4. Pricing and Promotions</div>
          </div>
        </div>
        <div className="content w-[1027px] shadow-md ">
          <div className="border-b-[0.8px] px-[48px] py-[24px] font-[700] text-[24px]">
            Intended learners
          </div>
          <div className="p-6">
            <p className="my-2">
              The following descriptions will be publicly visible on your Course
              Landing Page and will have a direct impact on your course
              performance. These descriptions will help learners decide if your
              course is right for them.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit2222}>
        {formData?.map((item) => (
          <div key={item.uuid}>
            <label htmlFor={item.uuid}>{item.description}:</label>
            <input
              type="text"
              uuid={item.uuid}
              value={item.description}
              onChange={(e) => handleInputChange(item.uuid, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => {
          setFormData([...formData, { uuid: 5, description: "d" }]);
        }}
      >
        AADD1111
      </button>
    </div>
  );
}

export default ChangeGoalsCoursePage;
