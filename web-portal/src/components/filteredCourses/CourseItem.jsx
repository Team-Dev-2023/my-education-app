import { Rating } from "@mui/material";
import React from "react";

import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import { sectionTotalLength } from "utils/helpers/totalLengthCalculator.helper";
import { lecturesCalculator } from "utils/helpers/calculateLecturesOfCourse.helper";

function CourseItem({ item }) {
  //format price
  const formatPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const coursePrice = (price) =>
    price === 0 ? "Free" : formatPrice.format(price);

  return (
    <div className="flex flex-row py-[16px] border-b border-b-[#d1d7dc]">
      <div className="flex-grow-0 mr-[16px] min-w-[262px] h-[145px]">
        <img
          src={item.imageUrl}
          alt="courseThumbnail"
          className="border mb-auto h-full w-full"
        />
      </div>
      <a href={"/"} className="flex flex-col mr-auto pr-[40px]">
        <span className="mb-[4px] text-[16px] text-[#1c1d1f] leading-[1.2] font-[700] text-ellipsis">
          {item.title}
        </span>
        <span className="mb-[4px] text-[14px] text-[#1c1d1f] leading-[1.2] font-[400]">
          {item.subTitle}
        </span>
        <span className="mb-[4px] text-[12px] text-[#6a6f73] leading-[1.2] font-[400]">
          Created by {item.createdBy}
        </span>
        <span className="mb-[4px] inline-flex items-center">
          <span className=" text-yellow-600 font-bold mr-[8px]">4.7</span>
          <Rating
            value={4}
            size="small"
            readOnly
            color={yellow[800]}
            emptyIcon={
              <StarIcon style={{ color: yellow[400] }} fontSize="inherit" />
            }
            className="mr-[8px]"
          />
        </span>
        <span className="mb-[4px] text-[12px] text-[#6a6f73] leading-[1.2] font-[400]">
          {sectionTotalLength(item.sections)} -{" "}
          {lecturesCalculator(item.sections)} lectures
        </span>
      </a>
      <div className="text-[16px] text-[#1c1d1f] leading-[1.2] font-[700] whitespace-nowrap flex-grow-0">
        {coursePrice(item.price)}
      </div>
    </div>
  );
}

export default CourseItem;
