import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { ROUTES } from "constants/routes";
import { getListCartAction } from "redux/actions/cart.action";
import { postItemCart } from "utils/helpers/workWithApi";
import { checkCourseInCart } from "utils/helpers/cart.helper";

function BuyerAction(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const { themeColor } = props;
  const { courseData } = props;
  const { cartData } = useSelector((state) => state.cart);
  const [existsInCart, setExistsInCart] = useState(false);

  useEffect(() => {
    cartData.data !== [] &&
      setExistsInCart(checkCourseInCart(courseData.uuid, cartData.data));
  }, [cartData]);
  //format price
  const formatPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const coursePrice =
    courseData.price === 0 ? "Free" : formatPrice.format(courseData.price);
  const discountPrice = formatPrice.format(courseData.priceAfterDiscount);
  const addToCart = () => {
    const getCartData = () => {
      dispatch(
        getListCartAction({
          accessToken: accessToken,
        })
      );
    };
    postItemCart(accessToken, courseData.uuid, getCartData);
  };
  return (
    <>
      <div className="flex justify-start items-center">
        <span
          className={`text-[32px] text-${
            themeColor || "black"
          } font-bold leading-[1] mr-[8px]`}
        >
          {courseData.priceAfterDiscount !== 0 ? discountPrice : coursePrice}
        </span>
        {courseData.priceAfterDiscount !== 0 && (
          <span className="text-[#6a6f73] text-[16px] font-[400] line-through whitespace-nowrap">
            {coursePrice}
          </span>
        )}
      </div>
      <div className="w-full h-auto mt-[16px]">
        <div className="flex gap-[8px] h-[48px]">
          {!existsInCart ? (
            <button
              className="bg-[#a435f0] text-white text-[16px] leading-[1.2] font-bold h-full w-full"
              onClick={() => {
                addToCart();
              }}
            >
              Add to cart
            </button>
          ) : (
            <button
              className="bg-[#a435f0] text-white text-[16px] leading-[1.2] font-bold h-full w-full"
              onClick={() => {
                navigate(ROUTES.USER.CART);
              }}
            >
              Go to cart
            </button>
          )}

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
            onClick={() => {
              Promise.all([addToCart()]).then(navigate(ROUTES.USER.CHECK_OUT));
            }}
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
