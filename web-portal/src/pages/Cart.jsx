import React from "react";
import { Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, generatePath } from "react-router-dom";

import { useEffect, useState } from "react";
import { getListCartAction } from "redux/actions/cart.action";
import { deleteItemCart } from "utils/helpers/workWithApi";
import { ROUTES } from "constants/routes";
import { sectionTotalLength } from "utils/helpers/totalLengthCalculator.helper";
import {
  calculatePercentSaleOff,
  calculateTotalCartAfterDiscount,
  calculateTotalCartBeforeDiscount,
} from "utils/helpers/cart.helper";
import { Modal } from "antd";
import { AiFillDelete } from "react-icons/ai";
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const { cartData } = useSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemDelete, setItemDelete] = useState("");

  console.log("cartData", cartData);

  const removeItemCart = (courseUuid) => {
    const getCartData = () => {
      dispatch(
        getListCartAction({
          accessToken: accessToken,
        })
      );
    };
    deleteItemCart(accessToken, courseUuid, getCartData);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    removeItemCart(itemDelete.uuid);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function renderListCourseInCart() {
    return cartData?.data?.map((item, index) => {
      return (
        <div
          key={item.course.uuid}
          className="grid grid-cols-6 gap-2 border-t-[0.8px] border-[#b4b1b1] py-4"
        >
          <div className="col-span-1">
            <img
              className="w-[120px] h-[68px]"
              src={item.course.img}
              alt="img"
            />
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
    });
  }
  return (
    <div className="w-full flex justify-center my-8">
      <Modal
        title="Confirm Remove course"
        okButtonProps={{ style: { backgroundColor: "red" } }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <span>
          You definitely want to remove{" "}
          <i className="text-[#141414ed] font-[700]">{itemDelete.title}</i> from
          the cart{" "}
        </span>
      </Modal>
      <div className="flex flex-col item.courses-start gap-4 max-w-[1200px] w-full justify-center xxs:px-[16px] lg:px-[36px]">
        <h6 className="text-[36px] font-[700] my-2">Shopping Cart</h6>
        <div className="xxs:flex-col flex sm:flex-row lg:gap-12 xxs:gap-6 mt-6">
          <div className="flex-1 xxs:order-2 sm:order-1">
            <h4 className="col-span-1 mb-2 font-[700] text-[20px] text-start">
              {cartData.data.length} Courses in Cart
            </h4>
            <div className="flex flex-col gap-4">
              {renderListCourseInCart()}
            </div>
          </div>
          <div className="xxs:w-full  xxs:order-1 sm:order-2 sm:w-[200px] md:w-[280px]">
            <div>
              <div className="flex flex-col gap-2 ">
                <p className="font-[700] text-[22px] text-[#5d5c5c]">Total:</p>
                <h4 className="font-[700] text-[32px]">
                  đ{calculateTotalCartAfterDiscount(cartData.data)}
                </h4>
                <p className="line-through text-[22px] flex justify-start leading-6 text-[#2b2c2b9e]">
                  đ{calculateTotalCartBeforeDiscount(cartData.data)}
                </p>
                <p className="text-[22px] flex justify-start leading-6">
                  {calculatePercentSaleOff(
                    calculateTotalCartBeforeDiscount(cartData.data),
                    calculateTotalCartAfterDiscount(cartData.data)
                  )}
                  % off
                </p>
              </div>
              <div className="xxs:fixed xxs:bottom-0 xxs:right-0 sm:static w-full xxs:p-2 sm:p-0 bg-white">
                <button
                  className="text-center
                          w-full p-4 my-4 
              bg-[#a435f0] hover:bg-[#8710d8]
              text-white font-[700]"
                >
                  Checkout
                </button>
              </div>
            </div>
            <div className="flex flex-col  w-full border-t-[0.8px] border-[#b4b1b1]">
              <p className="font-[700] w-full my-2">Promotions</p>
              <form
                action=""
                className="flex max-w-full w-full overflow-hidden"
              >
                <input
                  type="text"
                  className="px-2 py-2 border-[0.8px] border-black w-[65%] "
                />
                <button className="text-center p-2 w-[35%] bg-[#a435f0] hover:bg-[#8710d8] text-white font-[700]">
                  Apply
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
