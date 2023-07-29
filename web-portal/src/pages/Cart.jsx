import React from "react";
import { useSelector } from "react-redux";

import { CircularProgress } from "@mui/material";
import ListCart from "components/cart/ListCart";
import ListCartEmpty from "components/cart/ListCartEmpty";

function Cart() {
  const { cartData } = useSelector((state) => state.cart);

  return (
    <div className="w-full flex justify-center my-8">
      <div className="flex flex-col item.courses-start gap-4 max-w-[1200px] w-full justify-center xxs:px-[16px] lg:px-[36px]">
        <h6 className="text-[36px] font-[700] my-2">Shopping Cart</h6>
        {cartData.load ? (
          <div className="container mx-auto h-32 flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : cartData.data.length > 0 ? (
          <ListCart cartData={cartData} />
        ) : (
          <ListCartEmpty cartData={cartData} />
        )}
      </div>
    </div>
  );
}

export default Cart;
