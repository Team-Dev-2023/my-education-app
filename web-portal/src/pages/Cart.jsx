import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { getListCartAction } from "redux/actions/cart.action";
import { deleteItemCart } from "utils/helpers/workWithApi";
import { ROUTES } from "constants/routes";
import {
  calculatePercentSaleOff,
  calculateTotalCartAfterDiscount,
  calculateTotalCartBeforeDiscount,
} from "utils/helpers/cart.helper";
import CartItem from "components/cart/CartItem";
import ConfirmRemoveModal from "components/cart/ConfirmRemoveModal";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const { cartData } = useSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemDelete, setItemDelete] = useState("");

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

  return (
    <div className="w-full flex justify-center my-8">
      <ConfirmRemoveModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        itemDelete={itemDelete}
      />
      <div className="flex flex-col item.courses-start gap-4 max-w-[1200px] w-full justify-center xxs:px-[16px] lg:px-[36px]">
        <h6 className="text-[36px] font-[700] my-2">Shopping Cart</h6>
        {cartData.load ? (
          <div className="container mx-auto h-32 flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : cartData.data.length > 0 ? (
          <div className="xxs:flex-col flex sm:flex-row lg:gap-12 xxs:gap-6 mt-6">
            <div className="flex-1 xxs:order-2 sm:order-1">
              <h4 className="col-span-1 mb-2 font-[700] text-[20px] text-start">
                {cartData.data.length} Courses in Cart
              </h4>
              <div className="flex flex-col gap-4">
                {cartData?.data?.map((item) => {
                  return (
                    <CartItem
                      key={item.course.uuid}
                      setItemDelete={setItemDelete}
                      showModal={showModal}
                      item={item}
                    />
                  );
                })}
              </div>
            </div>
            <div className="xxs:w-full  xxs:order-1 sm:order-2 sm:w-[200px] md:w-[280px]">
              <div>
                <div className="flex flex-col gap-2 ">
                  <p className="font-[700] text-[22px] text-[#5d5c5c]">
                    Total:
                  </p>
                  <h4 className="font-[700] text-[32px]">
                    ${calculateTotalCartAfterDiscount(cartData.data)}
                  </h4>
                  <p className="line-through text-[22px] flex justify-start leading-6 text-[#2b2c2b9e]">
                    ${calculateTotalCartBeforeDiscount(cartData.data)}
                  </p>
                  {cartData.data.length > 0 && (
                    <p className="text-[22px] flex justify-start leading-6">
                      {calculatePercentSaleOff(
                        calculateTotalCartBeforeDiscount(cartData.data),
                        calculateTotalCartAfterDiscount(cartData.data)
                      )}
                      % off
                    </p>
                  )}
                </div>
                <div className="xxs:fixed xxs:bottom-0 xxs:right-0 sm:static w-full xxs:p-2 sm:p-0 bg-white">
                  <button
                    onClick={() => navigate(ROUTES.USER.CHECK_OUT)}
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
        ) : (
          <div>
            <h4 className="col-span-1 mb-2 font-[700] text-[20px] text-start">
              {cartData.data.length} Courses in Cart
            </h4>
            <div className="w-full flex justify-center items-center flex-col gap-2 shadow-xl p-4 mt-2">
              <img
                className="w-fit"
                src="https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2.jpg"
                alt=""
              />
              <p>Your cart is empty. Keep shopping to find a course!</p>
              <button
                className="bg-[#a435f0] px-4 py-3 text-white mt-4"
                onClick={() => {
                  navigate(ROUTES.USER.HOME_PAGE);
                }}
              >
                Keep shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
