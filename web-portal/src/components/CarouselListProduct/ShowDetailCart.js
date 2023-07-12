import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";

import { AiOutlineCheck, AiOutlineHeart } from "react-icons/ai";

import { getListCartAction } from "redux/actions/cart.action";
import { sectionTotalLength } from "utils/helpers/totalLengthCalculator.helper";
import useTranslate from "utils/hook/useTranslate";
import { postItemCart } from "utils/helpers/workWithApi";
import { ROUTES } from "constants/routes";

const moment = require("moment");
require("moment/locale/en-gb");
require("moment/locale/vi");

function ShowDetailCart(carouseProduct, existsInCart) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const t = useTranslate();
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  const addToCart = () => {
    const getCartData = () => {
      dispatch(
        getListCartAction({
          accessToken: accessToken,
        })
      );
    };
    postItemCart(accessToken, carouseProduct.uuid, getCartData);
  };
  return (
    <div className="bg-[#fff]  text-[black]  flex flex-col gap-2 p-2">
      <h3 className="font-[700] ">{carouseProduct.title}</h3>
      <div className="flex gap-[4px] items-center">
        <p className="text-[12px]">{t.product.updated}</p>
        <p className=" text-[12px] font-[500] textShowDetailHome">
          {query.locale === "vi"
            ? moment(carouseProduct?.lastUpdatedAt)
                .locale("vn")
                .format("MMMM YYYY")
            : moment(carouseProduct?.lastUpdatedAt)
                .locale("en-gl")
                .format("MMMM YYYY")}
        </p>
      </div>
      <div className="w-fit flex flex-nowrap justify-start ">
        <div>
          {query.locale === "vi" ? (
            <div className="flex flex-nowrap gap-[2px]">
              <p className="text-[10px]">{t.product.totalTime}</p>
              <p className="text-[10px]">
                {sectionTotalLength(carouseProduct?.totalTime || 12321)}
              </p>
              <p className="text-[10px]"> giờ</p>
            </div>
          ) : (
            <div className="flex flex-nowrap  gap-[2px]">
              <p className="text-[10px]">
                {sectionTotalLength(carouseProduct?.totalTime || 21321)}
              </p>
              <p className="flex flex-nowrap text-[10px] ">
                {t.product.totalTime}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-nowrap gap-2 items-center">
          <p className="w-fit text-[10px] flex flex-nowrap mx-[2px]">
            -
            <p className="w-fit text-[10px] mx-[2px]">
              {carouseProduct?.level === "beginnerLevel"
                ? t.product.beginnerLevel
                : t.product.allLevel}
            </p>
            -
          </p>
        </div>
        <div className="text-[10px]">{t.product.subtitle}</div>
      </div>
      <div className="font-[500] text-[12px]">{carouseProduct.subTitle}</div>
      <div>
        {carouseProduct?.courseKnowledgeList?.map((item) => {
          return (
            <div key={item.uuid} className="flex gap-2">
              <div>
                <AiOutlineCheck className="text-[14px] mt-[2px]" />
              </div>
              <div className="text-[12px]">{item.description}</div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 w-full justify-center">
        {!existsInCart ? (
          <button
            className="w-fit min-w-[160px]  text-[16px] p-[8px] 
        rounded-sm text-center hover:bg-[#ba1ca5d7] bg-[#ba1ca5] text-white"
            onClick={() => {
              addToCart();
            }}
          >
            {t.product.add_to_cart}
          </button>
        ) : (
          <button
            className="w-fit min-w-[160px]  text-[16px] p-[8px] 
        rounded-sm text-center hover:bg-[#ba1ca5d7] bg-[#ba1ca5] text-white"
            onClick={() => {
              navigate(ROUTES.USER.CART);
            }}
          >
            {t.product.goto_to_cart}
          </button>
        )}

        <button className="rounded-[999px]  border-[0.8px] border-#141012ef p-2 hover:bg-[#6b667051]">
          <AiOutlineHeart className="text-[32px]" />
        </button>
      </div>
    </div>
  );
}

export default ShowDetailCart;
