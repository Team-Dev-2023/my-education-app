import React from "react";

function CartDetailItem({ item }) {
  return (
    <div className="flex flex-row p-[8px] mb-[48px]">
      <img
        className="h-[32px] w-[32px] mr-[8px]"
        src="https://img-c.udemycdn.com/course/750x422/2099246_11dc_2.jpg"
        alt="course-thumbnail"
      />
      <span className="text-[#1c1d1f] text-[14px] font-bold leading-[1.4] mr-auto">
        {item.title}
      </span>
      <div className="flex flex-col">
        <span className="font-[400] text-[14px]">${item.price}</span>
        <span className="font-[400] text-[14px] line-through">
          ${item.priceAfterDiscount}
        </span>
      </div>
    </div>
  );
}

export default CartDetailItem;
