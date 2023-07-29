import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, generatePath } from "react-router-dom";

import { ROUTES } from "constants/routes";
import {
  calculateTotalCartAfterDiscount,
  calculateTotalCartBeforeDiscount,
} from "utils/helpers/cart.helper";

function ListCartMini() {
  const navigate = useNavigate();
  const { cartData } = useSelector((state) => state.cart);

  function renderListCourseInCart() {
    return cartData?.data?.map((item) => {
      return (
        <div
          key={item.course.uuid}
          className="w-full flex gap-3 p-[1rem] border-b-[0.8px] border-[#798495a5]"
          onClick={() => {
            navigate(
              generatePath(ROUTES.USER.DETAIL_PRODUCT, {
                uuid: item.course.uuid,
              })
            );
          }}
        >
          <div className="w-[6.4rem]">
            <img src={item.course.imageUrl} alt="img" className="w-[6.4rem]" />
          </div>
          <div className="w-[19.2rem] flex gap-2 justify-between flex-col">
            <h4 className="font-[700] line-clamp-2">{item.course.title}</h4>
            <p className="font-[400] text-[14px]">By {item.course.createBy}</p>
            <div className="flex gap-3 items-center">
              <h4 className="font-[700] text-[16px]">
                ${item.course.priceAfterDiscount.toLocaleString()}
              </h4>
              <p className="line-through text-[12px] leading-4">
                ${item.course.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="bg-[#fffffff9] flex flex-col w-full shadow-lg">
      {cartData?.data?.length > 0 ? (
        <>
          <div className="w-full">{renderListCourseInCart()} </div>
          <div className="w-full p-[1rem] shadow-2xl flex flex-col gap-2 items-stretch">
            <div className="flex gap-3 justify-center items-center">
              <h4 className="font-[700] text-[18px]">
                Total: ${calculateTotalCartAfterDiscount(cartData.data)}
              </h4>
              <p className="line-through text-[15px] flex justify-center leading-6">
                ${calculateTotalCartBeforeDiscount(cartData.data)}
              </p>
            </div>

            <button
              className="w-full p-[1rem] flex justify-center text-white font-[700]
         bg-[#1e1e1f] hover:bg-[#5e5763]"
              onClick={() => {
                navigate(ROUTES.USER.CART);
              }}
            >
              Go to cart
            </button>
          </div>
        </>
      ) : (
        <div className="w-full">
          <p className="w-full text-center my-4 font-[500]">
            Your cart is empty
          </p>
          <h2
            className="w-full text-center my-4 text-[#a435f0] text-[20px] font-[500] hover:cursor-pointer"
            onClick={() => {
              navigate(ROUTES.USER.HOME_PAGE);
            }}
          >
            Keep shopping
          </h2>
        </div>
      )}
    </div>
  );
}

export default ListCartMini;
