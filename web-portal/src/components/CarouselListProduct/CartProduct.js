import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { Rate } from "antd";

function CartProduct(carouseProduct) {
  const navigate = useNavigate();

  // render item impression
  // const renderListImpression = (listImpression) => {
  //   return listImpression?.map((item, index) => {
  //     return (
  //       <div key={item}>
  //         {item === 1 ? (
  //           <div className="px-[6px] py-[4px] w-fit font-[600] text-[12px] bg-[#eceb98]">
  //             {t.product.bestseller}
  //           </div>
  //         ) : item === 2 ? (
  //           <div className="px-[6px] py-[4px] w-fit font-[600] text-[12px] bg-[#f3ca8c]">
  //             {t.product.highest_rated}
  //           </div>
  //         ) : item === 3 ? (
  //           <div className="px-[6px] py-[4px] w-fit font-[600] text-[12px] bg-[#acd2cc]">
  //             {t.product.new}
  //           </div>
  //         ) : (
  //           <></>
  //         )}
  //       </div>
  //     );
  //   });
  // };
  // main feature

  return (
    <div
      className=" hover:cursor-pointer"
      onClick={() => {
        navigate(
          generatePath(ROUTES.USER.DETAIL_PRODUCT, {
            uuid: carouseProduct.uuid,
          })
        );
      }}
    >
      <div>
        <img
          className="w-full max-h-[126px] object-cover "
          src={"https://img-c.udemycdn.com/course/750x422/2099246_11dc_2.jpg"}
          alt="imageCarouseProductCarouselListProduct"
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <h3 className="text-[#1c1d1f] font-[700] md:text-[15px] xxs:text-[14px] text-start leading-[1.2] tracking-[-0.02rem] line-clamp-2 text-ellipsis whitespace-normal">
          {carouseProduct.title}
        </h3>
        <div className="md:text-[16px] xxs:text-[14px] text-start">
          {carouseProduct.createdBy}
        </div>
        <div className="flex justify-start items-center">
          <span className="mr-2 font-[700] text-[#b4690e] md:text-[16px] xxs:text-[14px] text-start ">
            {carouseProduct?.rate}
          </span>
          <Rate
            className="!text-[14px]"
            disabled
            allowHalf
            defaultValue={carouseProduct?.rate}
          />
          <span className="md:text-[16px] xxs:text-[14px] text-start">
            ({carouseProduct?.totalRate})
          </span>
        </div>
        <div className="w-full flex">
          <div>
            <span className="mr-2 flex items-center font-[700] md:text-[16px] xxs:text-[14px]">
              ₫
              <span className=" text-start  md:text-[16px] xxs:text-[14px]">
                {carouseProduct.priceAfterDiscount.toLocaleString()}
              </span>
            </span>
          </div>
          <div>
            <s>
              <span className="flex w-fit md:text-[16px] xxs:text-[13px] text-start leading-none whitespace-normal">
                ₫{carouseProduct.price.toLocaleString()}
              </span>
            </s>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {/* {renderListImpression(carouseProduct.impression)} */}
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
