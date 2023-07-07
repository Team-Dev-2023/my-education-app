import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";

import { useNavigate, generatePath } from "react-router-dom";
import { ROUTES } from "../constants/routes";

import { getListCourse } from "../utils/helpers/workWithAPI";

function ListCoursePage() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [listCourse, setListCourse] = useState([]);

  useEffect(() => {
    getListCourse(accessToken, setListCourse);
  }, []);
  function deleteCourse() {}

  const renderCourses = (courses) => {
    return courses?.map((item) => {
      return (
        <div
          key={item.uuid}
          className="flex gap-2 overflow-hidden  h-[118px] border-[0.8px]"
        >
          <div className="w-[118px] h-[118px]">
            <img
              src={
                item.imageUrl === "string" || item.imageUrl === ""
                  ? "https://s.udemycdn.com/course/200_H/placeholder.jpg"
                  : `${item.imageUrl}`
              }
              alt="img"
              className=""
            />
          </div>
          <div className="hover:cursor-pointer flex-1 group relative py-2">
            <h4 className="group-hover:opacity-25 font-[700]">{item.title}</h4>
            <h4
              className="hidden group-hover:block 
            absolute top-[50%] right-[50%] text-[20px]
            font-[700] text-[#3541f0]"
              onClick={() => {
                navigate(
                  generatePath(ROUTES.LECTURE.CHANGE_INFO_COURSE, {
                    courseUuid: item.uuid,
                  })
                );
              }}
            >
              Edit / Manage course
            </h4>
            <button
              className="hidden group-hover:block 
            absolute top-[35%] right-[20%] text-[20px]
            font-[700] text-[#ffffff]
            bg-[#ec5126ea] py-3 px-4"
              onClick={() => {
                deleteCourse(item.uuid);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-full flex flex-col justify-center my-2 gap-4 p-[44px]">
      <h3 className="font-[700] text-[44px]">Courses</h3>
      <div className="w-full  flex flex-col gap-4">
        <div className="flex w-full justify-between items-center">
          <Form
            name="basic"
            style={{
              maxWidth: 600,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item name="searchCourse">
              <Input placeholder="Search your course" />
            </Form.Item>
            <Form.Item>
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "tom",
                    label: "Tom",
                  },
                ]}
              />
            </Form.Item>
          </Form>

          <button
            className="bg-[#a435f0] p-3 text-white font-[700]"
            onClick={() => {
              navigate(ROUTES.LECTURE.CREATE_COURSE);
            }}
          >
            New course
          </button>
        </div>
        <div className="flex flex-col gap-4  ">{renderCourses(listCourse)}</div>
      </div>
    </div>
  );
}

export default ListCoursePage;
