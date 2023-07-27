import React from "react";
import CartDetailItem from "./CartDetailItem";

function OrderDetails({ cartData }) {
  // console.log("cartData", cartData);
  return (
    <div className="flex flex-col mb-[48px]">
      <h2 className="text-[24px] font-bold leading-5 mb-[16px]">
        Order details
      </h2>
      {cartData.map((item) => (
        <CartDetailItem key={item.uuid} item={item.course} />
      ))}
    </div>
  );
}

export default OrderDetails;
