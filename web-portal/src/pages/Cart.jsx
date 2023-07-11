import React from "react";
import carouselProducts from "asset/carouselProducts";
import { Rate } from "antd";
function Cart() {
  //calculation length course (hour)
  function convertToHours(milliseconds) {
    const hours = milliseconds / (1000 * 60 * 60);
    const roundedHours = hours.toFixed(1);
    return parseFloat(roundedHours);
  }
  function renderListCourseInCart() {
    return carouselProducts.map((item, index) => {
      return (
        <div className="grid grid-cols-6 gap-2 border-t-[0.8px] border-[#b4b1b1] py-4">
          <div className="col-span-1">
            <img className="w-[120px] h-[68px]" src={item.img} alt="img" />
          </div>
          <div className="md:col-span-3 xxs:col-span-4 flex flex-col gap-2">
            <h4 className="font-[700]">{item.title}</h4>
            <p className="text-[14px] font-[400]">By {item.author}</p>
            <div className="flex justify-start items-center">
              <span className="mr-2 font-[700] text-[#b4690e] md:text-[16px] xxs:text-[14px] text-start ">
                {item.rate}
              </span>
              <Rate
                className="!text-[14px]"
                disabled
                allowHalf
                defaultValue={item.rate}
              />
              <span className="md:text-[16px] xxs:text-[14px] text-start">
                ({item.totalRate})
              </span>
            </div>
            <div>
              <p>
                <div className="flex flex-nowrap  gap-[2px]">
                  <p className="text-[12px]">
                    {convertToHours(item.totalTime)}
                  </p>
                  <p className="flex flex-nowrap text-[12px] ">total hours</p>
                </div>
              </p>
            </div>
          </div>
          <div className="xxs:hidden col-span-1 md:flex justify-center items-start">
            <button>Remove</button>
          </div>
          <div className="col-span-1 flex flex-col justify-between font-[700]">
            <p> đ{item.price.toLocaleString()}</p>
            <button className="md:hidden xxs:block">Remove</button>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="w-full flex justify-center my-8">
      <div className="flex flex-col items-start gap-4 max-w-[1200px] w-full justify-center xxs:px-[16px] lg:px-[36px]">
        <h6 className="text-[36px] font-[700] my-2">Shopping Cart</h6>
        <div className="xxs:flex-col flex sm:flex-row lg:gap-12 xxs:gap-6 mt-6">
          <div className="flex-1 xxs:order-2 sm:order-1">
            <h4 className="col-span-1 mb-2 font-[700] text-[20px] text-start">
              ...Courses in Cart
            </h4>
            <div className="flex flex-col gap-4">
              {renderListCourseInCart()}
            </div>
          </div>
          <div className="xxs:w-full  xxs:order-1 sm:order-2 sm:w-[200px] md:w-[280px]">
            <div>
              <div className="flex flex-col gap-2 ">
                <p className="font-[700] text-[#5d5c5c]">Total:</p>
                <h6 className="font-[700] xxs:text-[22px] lg:text-[36px] xxs:mb-4 sm:mb-0">
                  đ3,234,323
                </h6>
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
