import React from "react";
import CoursesSlider from "./CoursesSlider";

function FeaturedCourses({ courses }) {
  return (
    <div className="mb-[48px]">
      <h2 className="font-[700] text-[24px] leading-[1.2] mb-[16px]">
        Featured courses
      </h2>
      <CoursesSlider courses={courses} />
    </div>
  );
}

export default FeaturedCourses;
