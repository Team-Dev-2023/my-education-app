import { Radio } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useEffect, useRef, useState } from "react";

function PaymentMethodsOptions({ handleSetPaymentMethod }) {
  const radioPaypalRef = useRef();
  const radioCartRef = useRef();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handleRadioChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const controlProps = (paymentMethod) => ({
    checked: selectedPaymentMethod === paymentMethod,
    onChange: handleRadioChange,
    value: paymentMethod,
    ref: paymentMethod === "paypal" ? radioPaypalRef : radioCartRef,
  });

  useEffect(() => {
    handleSetPaymentMethod(selectedPaymentMethod);
  }, [selectedPaymentMethod]);

  return (
    <div className="flex flex-col mb-[48px]">
      <div className="flex flex-row items-center mb-[16px]">
        <h2 className="text-[24px] font-bold leading-5">Payment method </h2>
        <span className="text-[#6a6f73] text-[12px] leading-6 font-normal ml-auto mr-2">
          Secured connection{" "}
          <LockIcon fontSize="18px" style={{ color: "#1c1d1f" }} />
        </span>
      </div>
      <div
        onClick={() => {
          setSelectedPaymentMethod(radioPaypalRef.current.children[0].value);
        }}
        className="cursor-pointer flex flex-row items-center mb-[-4px] p-2 bg-[#f7f9fa] max-h-[44px] border border-[#d1d7dc]"
      >
        <Radio {...controlProps(String("paypal"))} size="small" />
        <div className="flex flex-row items-center">
          <div className="h-7 aspect-video flex justify-center items-center py-[2px] mr-2 rounded-md border border-[#d1d7dc] bg-white">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174861.png"
              alt="paypal"
              className="h-full"
            />
          </div>
          <span className="text-[#1c1d1f] text-[16px] leading-[1.4] font-[700]">
            Paypal
          </span>
        </div>
      </div>
      <div
        onClick={() => {
          setSelectedPaymentMethod(radioCartRef.current.children[0].value);
        }}
        className="cursor-pointer flex flex-row items-center mb-[-4px] p-2 bg-[#f7f9fa] max-h-[44px] border border-[#d1d7dc]"
      >
        <Radio {...controlProps(String("card"))} size="small" />
        <div className="flex flex-row items-center">
          <div className="h-7 aspect-video flex justify-center items-center py-[2px] mr-2 rounded-md border border-[#d1d7dc] bg-white">
            <img
              src="https://cdn-icons-png.flaticon.com/512/62/62780.png"
              alt="card"
              className="h-full"
            />
          </div>
          <span className="text-[#1c1d1f] text-[16px] leading-[1.4] font-[700]">
            Credit/Debit Card
          </span>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodsOptions;
