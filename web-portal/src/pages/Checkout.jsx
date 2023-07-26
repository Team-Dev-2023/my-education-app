import { Grid, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "@mui/material/Select";
import LockIcon from "@mui/icons-material/Lock";
import {
  calculateTotalDiscounts,
  calculateTotalPayment,
} from "utils/helpers/calculateTotalPayment.helper";
import PaymentMethodsOptions from "components/checkout/PaymentMethodsOptions";
import OrderDetails from "components/checkout/OrderDetails";
let countries = require("../asset/countries_v1.json");

function Checkout() {
  const [countrySelected, setCountrySelected] = useState("Vietnam");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
  const [cart, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalDiscounts, setTotalDicounts] = useState();
  const cartData = useSelector((state) => state.cart.cartData.data);

  useEffect(() => {
    setCartData(cartData);
  }, [cartData]);
  calculateTotalPayment(cart).then((result) => setTotalPrice(result));
  calculateTotalDiscounts(cart).then((result) => setTotalDicounts(result));
  //   console.log("data", cart);
  //   console.log("select", countrySelected);
  //   console.log("countries", countries);
  return (
    <div className="container !max-w-[984px] mx-auto">
      <Grid container spacing={2}>
        <Grid item xs={7} className="pr-[30px]">
          <h1 className="text-[32px] font-bold leading-5 my-8">Checkout</h1>
          <h2 className="text-[24px] font-bold leading-5 mb-[16px]">
            Billing address
          </h2>
          <div className="flex flex-row items-center max-w-[264px] mb-2">
            <span className="text-[14px] font-bold leading-5 pb-2">
              Country
            </span>
            <span className="text-[#6a6f73] text-[14px] leading-6 font-normal ml-auto">
              Required
            </span>
          </div>
          <Select
            className="w-[264px] !rounded-none border border-[#1c1d1f] h-12 mb-2"
            value={countrySelected}
            label="country"
            onChange={(event) => setCountrySelected(event.target.value)}
          >
            {countries.map((item) => (
              <MenuItem key={item.value} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <p className="text-[#6a6f73] text-[12px] leading-4 font-normal mb-[32px]">
            Udemy is required by law to collect applicable transaction taxes for
            purchases made in certain tax jurisdictions.
          </p>
          <PaymentMethodsOptions
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            selectedPaymentMethod={selectedPaymentMethod}
          />
          <OrderDetails cartData={cart} />
        </Grid>
        <Grid item xs={5}>
          <div className="py-[52px] pl-[32px] pr-[48px] max-w-[384px] h-full bg-[#f7f9fa] flex flex-col">
            <h2 className="text-[24px] font-bold leading-5 mb-[16px]">
              Summary
            </h2>
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
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Checkout;
