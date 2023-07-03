import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function BuyerAction(props) {
  const { themeColor } = props;
  const itemPrice = "đ 1.299.000";
  return (
    <>
      <div className="text-start">
        <span
          className={`text-[32px] text-${
            themeColor || "black"
          } font-bold leading-[1]`}
        >
          {itemPrice}
        </span>
      </div>
      <div className="w-full h-auto mt-[16px]">
        <div className="flex gap-[8px] h-[48px]">
          <button className="bg-[#a435f0] text-white text-[16px] leading-[1.2] font-bold h-full w-full">
            Add to cart
          </button>
          <div
            className={`border border-${
              themeColor || "black"
            } h-full w-[52px] flex justify-center items-center`}
          >
            <FavoriteBorderIcon style={{ color: `${themeColor || "black"}` }} />
          </div>
        </div>
        <div
          className={`h-[48px] mt-[8px] border border-${themeColor || "black"}`}
        >
          <button
            className={`text-${
              themeColor || "black"
            } text-[16px] leading-[1.2] font-bold h-full w-full`}
          >
            Buy now
          </button>
        </div>
      </div>
      <div
        className={`mt-[16px] mb-[16px] px-auto text-${themeColor || "black"}`}
      >
        <p className="text-[12px] font-[400] leading-[1.2] text-center">
          30-Day Money-Back Guarantee
        </p>
      </div>
    </>
  );
}

export default BuyerAction;
