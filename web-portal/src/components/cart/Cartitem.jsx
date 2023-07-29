import React from "react";
import { useNavigate, generatePath } from "react-router-dom";

import { AiFillDelete } from "react-icons/ai";
import { Rate } from "antd";

import { sectionTotalLength } from "utils/helpers/totalLengthCalculator.helper";
import { ROUTES } from "constants/routes";

function Cartitem({ item, showModal, setItemDelete }) {
  const navigate = useNavigate();
  return (
    <div
      key={item.course.uuid}
      className="grid grid-cols-6 gap-2 border-t-[0.8px] border-[#b4b1b1] py-4"
    >
      <div className="col-span-1">
        <img className="w-[120px] h-[68px]" src={item.course.img} alt="img" />
      </div>
      <div className="md:col-span-3 xxs:col-span-4 flex flex-col gap-2">
        <h4
          className="font-[700] hover:cursor-pointer"
          onClick={() => {
            navigate(
              generatePath(ROUTES.USER.DETAIL_PRODUCT, {
                uuid: item.course.uuid,
              })
            );
          }}
        >
          {item.course.title}
        </h4>
        <p className="text-[14px] font-[400]">By {item.course.author}</p>
        <div className="flex justify-start item.courses-center">
          <span className="mr-2 font-[700] text-[#b4690e] md:text-[16px] xxs:text-[14px] text-start ">
            {item.course.rate}
          </span>
          <Rate
            className="!text-[14px]"
            disabled
            allowHalf
            defaultValue={item.course.rate}
          />
          <span className="md:text-[16px] xxs:text-[14px] text-start">
            ({item.course.totalRate})
          </span>
        </div>
        <div>
          <div>
            <div className="flex flex-nowrap  gap-[2px]">
              <p className="text-[12px]">
                {sectionTotalLength(item.course.sections || 1234)}
              </p>
              <p className="flex flex-nowrap text-[12px] ">total hours</p>
            </div>
          </div>
        </div>
      </div>
      <div className="xxs:hidden col-span-1 md:flex justify-center items-start text-[#e0294ef1]">
        <button
          onClick={() => {
            setItemDelete(item.course);
            showModal();
          }}
        >
          Remove
        </button>
      </div>
      <div className="col-span-1 flex flex-col items-center gap-2 justify-start font-[700]">
        <p className=" text-[18px] font-[700] text-[#a435f0]">
          {" "}
          đ{item.course?.priceAfterDiscount?.toLocaleString()}
        </p>
        <p className="line-through text-[14px] font-[400]">
          đ{item.course?.price?.toLocaleString()}
        </p>
        <button
          className="md:hidden xxs:block text-[#e0294ef1] mb-0"
          onClick={() => {
            setItemDelete(item.course);
            showModal();
          }}
        >
          <AiFillDelete className="text-[24px]" />
        </button>
      </div>
    </div>
  );
}

export default Cartitem;
