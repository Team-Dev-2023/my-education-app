import React, { Fragment, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { Grid, Navigation } from "swiper";
import { CircularProgress } from "@mui/material";

function TopicRecommended({ topics }) {
  // console.log("topic", topics);
  const renderTopics = (array) =>
    array.map((item) => (
      <SwiperSlide
        key={item.uuid}
        className=" !h-[50px] border-gray-400 border"
      >
        <a
          href={`/topic/${item.name.toLowerCase().split(" ").join("-")}`}
          className="h-full flex justify-center items-center text-center py-[8px] px-[16px]"
        >
          <strong>{item.name}</strong>
        </a>
      </SwiperSlide>
    ));
  return (
    <>
      <div className="container mx-auto my-2 relative sm:w-[calc(100%-40px)] xxs:w-full ">
        <Swiper
          loop={false}
          pagination={{
            clickable: true,
          }}
          grid={{
            rows: 2,
            fill: "column",
          }}
          slidesPerView={1}
          spaceBetween={10}
          modules={[Grid, Navigation]}
          navigation={{
            prevEl: `.swiper-button-prev-unique-recommend`,
            nextEl: `.swiper-button-next-unique-recommend`,
          }}
          breakpoints={{
            1185: {
              slidesPerView: 5,
              grid: {
                rows: 2,
                fill: "column",
              },
            },
            964: {
              slidesPerView: 4,
              grid: {
                rows: 2,
                fill: "column",
              },
            },
            680: {
              slidesPerView: 3,
              grid: {
                rows: 2,
                fill: "column",
              },
            },
          }}
          className="!h-[110px]"
        >
          {topics.length > 0 ? (
            renderTopics(topics)
          ) : (
            <div className="container mx-auto h-32 flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </Swiper>
        <div
          className={`swiper-button-next-unique-recommend absolute xxs:hidden sm:block top-[30px] z-10 sm:right-[-20px] `}
        >
          <button
            className=" !text-white rounded-[999px] border-[0.8px]
          border-[#696f74] hover:bg-[#5b5959]  bg-black"
          >
            <img
              className="w-[40px]"
              src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/icon-next-danhmuc.svg"
              alt=""
            />
          </button>
        </div>
        <div
          className={`swiper-button-prev-unique-recommend absolute  xxs:hidden sm:block top-[30px] z-10 sm:left-[-20px] `}
        >
          <button
            className="  !text-white rounded-[999px] border-[0.8px]
          border-[#696f74] hover:bg-[#5b5959]  bg-black"
          >
            <img
              className="w-[40px] rounded-[999px]  "
              src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/icon-prev-danhmuc.svg"
              alt=""
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default TopicRecommended;
