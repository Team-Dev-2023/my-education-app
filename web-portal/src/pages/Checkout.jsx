import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  calculateTotalDiscounts,
  calculateTotalPayment,
} from "utils/helpers/calculateTotalPayment.helper";
import PaymentMethodsOptions from "components/checkout/PaymentMethodsOptions";
import OrderDetails from "components/checkout/OrderDetails";
import SelectCountry from "components/checkout/SelectCountry";
import Summary from "components/checkout/Summary";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [billingAdress, setBillingAddress] = useState("");
  const [cart, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalDiscounts, setTotalDicounts] = useState();
  const cartData = useSelector((state) => state.cart.cartData.data);

  const handleSetPaymentMethod = (value) => {
    setPaymentMethod(value);
  };
  const handleSetCountry = (value) => {
    setBillingAddress(value);
  };

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
        <Grid item xs={12} md={7} className="!px-[32px]">
          <h1 className="text-[32px] font-bold leading-5 my-8">Checkout</h1>
          <SelectCountry handleSetCountry={handleSetCountry} />
          <PaymentMethodsOptions
            handleSetPaymentMethod={handleSetPaymentMethod}
          />
          <OrderDetails cartData={cart} />
        </Grid>
        <Grid item xs={12} md={5}>
          <div className="py-0 md:py-[52px] pl-[32px] pr-[32px] min-[900px]:max-w-[384px] h-full bg-white md:bg-[#f7f9fa] w-full mx-auto flex flex-col">
            <Summary totalDiscounts={totalDiscounts} totalPrice={totalPrice} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Checkout;
