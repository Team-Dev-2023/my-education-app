import { ROUTES } from "constants/routes";
import React from "react";
import { useNavigate } from "react-router-dom";

const ListCartEmpty = ({ cartData }) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default ListCartEmpty;
