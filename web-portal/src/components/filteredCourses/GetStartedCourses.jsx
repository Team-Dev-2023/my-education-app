import CarouselListProduct from "components/CarouselListProduct/CarouselListProduct";
import React from "react";

function GetStartedCourses({ courses }) {
  return (
    <div className="mb-[48px]">
      <h2 className="font-[700] text-[24px] leading-[1.2] mb-[16px]">
        Courses to get you started
      </h2>
      <CarouselListProduct
        listProduct={courses}
        name_carousel={"highCourses"}
      />
    </div>
  );
}

export default GetStartedCourses;
