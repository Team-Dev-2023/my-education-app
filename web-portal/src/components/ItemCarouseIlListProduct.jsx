import { generatePath, useLocation, useNavigate } from "react-router-dom";
import qs from "qs";

import { Rate, Tooltip } from "antd";
import { AiOutlineCheck, AiOutlineHeart } from "react-icons/ai";
import useTranslate from "utils/hook/useTranslate";
import { ROUTES } from "constants/routes";
import { sectionTotalLength } from "utils/helpers/totalLengthCalculator.helper";

const moment = require("moment");
require("moment/locale/en-gb");
require("moment/locale/vi");

function ItemCarouseIlListProduct({ carouseProduct }) {
  const t = useTranslate();
  const { search } = useLocation();
  const navigate = useNavigate();
  const isLargeScreen = window.innerWidth > 980;
  const query = qs.parse(search, { ignoreQueryPrefix: true });

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
  const showDetail = (
    <div className="bg-[#fff]  text-[black]  flex flex-col gap-2 p-2">
      <h3 className="font-[700] ">{carouseProduct.title}</h3>
      <div className="flex gap-[4px] items-center">
        {/* <div>{renderListImpression(carouseProduct.impression)}</div> */}
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
        <button className="w-fit min-w-[160px]  text-[16px] p-[8px] rounded-sm text-center hover:bg-[#ba1ca5d7] bg-[#ba1ca5] text-white">
          {t.product.add_to_cart}
        </button>
        <button className="rounded-[999px]  border-[0.8px] border-#141012ef p-2 hover:bg-[#6b667051]">
          <AiOutlineHeart className="text-[32px]" />
        </button>
      </div>
    </div>
  );
  const card = (
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
          src={carouseProduct.imageUrl}
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
              <p className=" text-start  md:text-[16px] xxs:text-[14px]">
                {carouseProduct.priceAfterDiscount.toLocaleString()}
              </p>
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

  return (
    <div>
      {isLargeScreen ? (
        <Tooltip
          placement="right"
          title={showDetail}
          color={"#ffff"}
          className="bg-white"
        >
          {card}
        </Tooltip>
      ) : (
        <> {card}</>
      )}
    </div>
  );
}
export default ItemCarouseIlListProduct;
