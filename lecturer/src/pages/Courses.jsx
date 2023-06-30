import { Select, Form, Input } from "antd";
import { ROUTES } from "constants/routes";
import React from "react";
import { useNavigate } from "react-router-dom";

function Courses() {
  const navigate = useNavigate();
  const Courses = [
    {
      id: 1,
      title: "Học lõm",
      imageUrl: "https://img-c.udemycdn.com/course/200_H/5408742_1a5a_3.jpg",
    },
    {
      id: 2,
      title: "Học xạo chó ",
      imageUrl: "https://img-c.udemycdn.com/course/200_H/5408742_1a5a_3.jpg",
    },
    {
      id: 3,
      title: "Học lõm",
      imageUrl: "",
    },
  ];

  const renderCourses = (courses) => {
    return courses.map((item, index) => {
      return (
        <div
          key={item.id}
          className="flex gap-2 overflow-hidden  h-[118px] border-[0.8px]"
        >
          <div className="w-[118px] h-[118px]">
            <img
              src={
                item.imageUrl === ""
                  ? "https://s.udemycdn.com/course/200_H/placeholder.jpg"
                  : item.imageUrl
              }
              alt="img"
              className=""
            />
          </div>
          <div className="hover:cursor-pointer flex-1 group relative py-2">
            <h4 className="group-hover:opacity-25 font-[700]">{item.title}</h4>
            <h4 className="hidden group-hover:block absolute top-[50%] right-[50%] text-[20px] font-[700] text-[#3541f0]">
              Edit / manage course
            </h4>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-full flex justify-center my-2">
      <div className="max-w-[1200px] xs:w-[1200px] flex flex-col gap-4">
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
        <div className="flex flex-col gap-4  ">{renderCourses(Courses)}</div>
      </div>
    </div>
  );
}

export default Courses;
