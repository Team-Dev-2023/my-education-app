import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Upload } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { getListCourseAction } from "redux/actions";
const api = process.env.REACT_APP_API;
function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    dispatch(
      getListCourseAction({ accessToken: accessToken, page: 1, perPage: 10 })
    );
  }, []);

  const { listCourse } = useSelector((store) => store.course);
  console.log("listCourse", listCourse);
  const renderCourses = (courses) => {
    return courses?.map((item, index) => {
      console.log(item);
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
                  : `${api}/${item.imageUrl}`
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
              Edit / manage course
            </h4>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-full flex flex-col justify-center my-2 p-[24px]">
      <h3 className="font-[700] text-[44px]">Courses</h3>
      <div className="max-w-[1200px] w-full  flex flex-col gap-4">
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
        <div className="flex flex-col gap-4  ">
          {renderCourses(listCourse?.data?.data)}
        </div>
      </div>
    </div>
  );
}

export default Courses;
