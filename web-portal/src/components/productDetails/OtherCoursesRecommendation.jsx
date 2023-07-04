import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { ROUTES } from "constants/routes";
import { API_ENDPOINT } from "constants/api";

function OtherCoursesRecommendation(props) {
  const { data } = props;
  const imgUrl = "https://img-c.udemycdn.com/course/50x50/2508942_11d3_3.jpg";
  const totalHours = 22;
  const updatedTime = "5/2023";
  const [courses, setCourses] = useState([...data.courseRecommendationList]);
  const api = process.env.REACT_APP_API;

  const fetchCourses = (courseItem) => {
    axios
      .get(`${api}${API_ENDPOINT.COURSE_DETAIL}${`/${courseItem.uuid}`}`)
      .then((response) => {
        setCourses((prevState) => [...prevState, response.data]);
        console.log("data", response.data);
      })
      .catch((e) => console.log("error: ", e));
  };

  useEffect(() => {
    if (data) {
      const courseList = data.courseRecommendationList;
      for (let index = 0; index < courseList.length; index++) {
        fetchCourses(courseList[index]);
      }
    }
  }, []);

  return (
    <div className="mb-[32px] color-[#1c1d1f] max-w-[700px]">
      <h2 className="mb-[16px] font-[700] text-[24px]">Students also bought</h2>
      <div className="container">
        {courses.length === 0 ? (
          <div className="flex justify-center items-center h-56">
            <CircularProgress />
          </div>
        ) : (
          courses.map((item) => (
            <div key={item.uuid} className="py-[16px] flex flex-row">
              <div className="block">
                <img
                  src={imgUrl}
                  alt="recommended"
                  className="w-[64px] h-[64px]"
                />
              </div>
              <div className="flex flex-col min-w-[180px] ml-[8px]">
                <a
                  href={`${ROUTES.USER.DETAIL_PRODUCT}/${item.uuid}`}
                  className="leading-[1.2] font-[700] text-[16px] tracking-[-0.2px]"
                >
                  {item.description}
                </a>
                <div className="mt-[8px] ml-[8px]">
                  <span className="text-[#1e6055] text-[14px] font-[700] mr-1">
                    {totalHours} total hours
                  </span>
                  <span className="text-[#1c1d1f] text-[14px] font-[400]">
                    - Updated: {updatedTime}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OtherCoursesRecommendation;
