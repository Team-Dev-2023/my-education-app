import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { getCourseAction, putCourseAction } from "redux/actions";
import { AiFillDelete } from "react-icons/ai";
import SectionCourse from "components/SectionCourse";

const uuid = require("uuid");

function ChangeCurriculumCoursePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const { courseUuid } = useParams();
  console.log(accessToken);
  const { dataCourse } = useSelector((store) => store.course);
  const [infoCourse, setInfoCourse] = useState({});
  const [listSectionPut, setListSectionPut] = useState();

  const [isAddNewSection, setIsAddNewSection] = useState(false);
  const [isAddCurriculumItem, setIsAddCurriculumItem] = useState(false);

  function generateUUID() {
    return uuid.v4();
  }
  useEffect(() => {
    dispatch(getCourseAction({ courseUuid: courseUuid }));
  }, []);

  useEffect(() => {
    const {
      createdAt,
      createdBy,
      lastUpdatedAt,
      lastUpdatedBy,
      uuid,
      category,
      subCategory,
      topic,
      ...dataSplitted
    } = dataCourse.data;
    setInfoCourse(dataSplitted);
    setListSectionPut(dataCourse.data.sections);
  }, [dataCourse]);

  const addNewSection = (e, value) => {
    e.preventDefault();
    setListSectionPut([
      ...listSectionPut,
      {
        uuid: generateUUID(),
        name: e.target.name.value,
        position: listSectionPut.length,
        lectures: [
          {
            uuid: generateUUID(),
            name: "string",
            url: "string",
            description: "string",
            preview: true,
            type: 0,
            videoDuration: 0,
          },
        ],
      },
    ]);
    setIsAddNewSection(false);
  };

  const renderListSectionPut = (listSectionPut) => {
    return listSectionPut?.map((item, index) => {
      return (
        <SectionCourse
          key={item.uuid}
          section={item}
          position={index}
          listSectionPut={listSectionPut}
          setListSectionPut={setListSectionPut}
        ></SectionCourse>
      );
    });
  };
  return (
    <div className="flex flex-col justify-center items-center max-w-[1400px] w-full ">
      <div
        className="header w-full h-[56px] px-4 bg-[#1c1d1f] text-white flex justify-between items-center 
      fixed top-0"
      >
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
          <button className="px-4 py-2 bg-[#e65e35]">Preview</button>
        </div>
      </div>
      <div className="max-w-[1340px] w-full flex  my-2 gap-2 p-[24px] mt-[44px] ">
        <div className="slide-bar w-[240px] fixed left-[24px]">
          <h4 className="font-[700] mb-2">Publish your course</h4>
          <div className="flex flex-col gap-3">
            <div
              className=" p-2 cursor-pointer"
              onClick={() => {
                navigate(generatePath(ROUTES.LECTURE.HOME_PAGE));
              }}
            >
              1. Course landing page
            </div>
            <div className="bg-[#c0c5c1] p-2 cursor-pointer">
              2. Intended learners
            </div>
            <div className="p-2">3. Curriculum</div>
            <div className=" p-2">4. Pricing and Promotions</div>
          </div>
        </div>
        <div className="content w-[1027px] shadow-md  ml-[240px]">
          <div className="border-b-[0.8px] px-[48px] py-[24px] font-[700] text-[24px]">
            Curriculum
          </div>
          <div className="p-6">
            <p className="my-2 leading-8">
              Start putting together your course by creating sections, lectures
              and practice activities (quizzes, coding exercises and
              assignments). Use your course outline to structure your content
              and label your sections and lectures clearly. If you’re intending
              to offer your course for free, the total length of video content
              must be less than 2 hours.
            </p>
          </div>
          <div className="listCurriculum">
            {renderListSectionPut(listSectionPut)}
          </div>
          {isAddNewSection ? (
            <div className="w-fit p-2 border-[0.8px] border-black flex  gap-4">
              <h4>New Section</h4>
              <div>
                <form
                  form={"addNewSectionForm"}
                  onSubmit={(e, value) => addNewSection(e, value)}
                  action=""
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Enter a Title"
                    className="p-2 w-[400px] border-[0.8px] border-black"
                  />
                  <h4>
                    What will students be able to do at the end of this section?
                  </h4>

                  <div className="flex justify-end gap-4">
                    <button
                      className="p-2 w-fit border-[0.8px] border-black"
                      onClick={() => setIsAddNewSection(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="p-2 w-fit border-[0.8px] border-black"
                      type="submit"
                    >
                      Add section
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <button
              className="w-fit p-2 border-[0.8px] border-black"
              onClick={() => {
                setIsAddNewSection(true);
              }}
            >
              Add section
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangeCurriculumCoursePage;
