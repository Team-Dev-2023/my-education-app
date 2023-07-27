import React from "react";

function Summary({ totalPrice, totalDiscounts }) {
  return (
    <>
      <h2 className="text-[24px] font-bold leading-5 mb-[16px]">Summary</h2>
      <div className="flex flex-row mb-[8px]">
        <span className="text-[#1c1d1f] text-[14px] font-[400] mr-auto">
          Original Price:
        </span>
        <span className="text-[#1c1d1f] text-[14px] font-[400]">
          ${totalPrice}
        </span>
      </div>
      <div className="flex flex-row mb-[8px]">
        <span className="text-[#1c1d1f] text-[14px] font-[400] mr-auto">
          Discounts:
        </span>
        <span className="text-[#1c1d1f] text-[14px] font-[400]">
          -${totalDiscounts}
        </span>
      </div>
      <div className="my-[12px] bg-[#1C1D1F] opacity-50 h-[1px]"></div>
      <div className="flex flex-row mb-[8px]">
        <span className="text-[#1c1d1f] text-[16px] font-[700] mr-auto">
          Total:
        </span>
        <span className="text-[#1c1d1f] text-[16px] font-[700]">
          ${totalPrice - totalDiscounts}
        </span>
      </div>
      <div className="my-[32px]">
        <p className="text-[#6a6f73] text-[12px] leading-4 font-normal mb-[8px]">
          By completing your purchase you agree to these Terms of Service.
        </p>
        <button className="w-full bg-[#a435f0] h-[60px] mb-[8px] text-white text-[16px] font-[700] leading-[1.2]">
          Complete Checkout
        </button>
        <p className="text-center text-[#6a6f73] text-[12px] leading-4 font-normal mb-[8px]">
          30-Day Money-Back Guarantee
        </p>
      </div>
    </>
  );
}

export default Summary;
