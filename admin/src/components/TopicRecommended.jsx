import React, { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { Grid, Navigation } from "swiper";

function TopicRecommended() {
  console.log("render  topic");
  const topicArray = [
    {
      topic: "Node.Js",
      url: "/",
    },
    {
      topic: "xxx.Js",
      url: "/",
    },
    {
      topic: "ccc.Js",
      url: "/",
    },
    {
      topic: "vvv.Js",
      url: "/",
    },
    {
      topic: "bbb.Js",
      url: "/",
    },
    {
      topic: "nnn.Js",
      url: "/",
    },
    {
      topic: "mmm.Js",
      url: "/",
    },
    {
      topic: "aaa.Js",
      url: "/",
    },
    {
      topic: "sss.Js",
      url: "/",
    },
    {
      topic: "fff.Js",
      url: "/",
    },
    {
      topic: "ggg.Js",
      url: "/",
    },
    {
      topic: "hhh.Js",
      url: "/",
    },
    {
      topic: "jjj.Js",
      url: "/",
    },
  ];
  const renderTopics = (array) =>
    array.map((item) => (
      <SwiperSlide
        key={item.topic}
        className=" !h-[50px] border-gray-400 border"
      >
        <a href={item.url} className="h-full flex justify-center items-center">
          <strong>{item.topic}</strong>
        </a>
      </SwiperSlide>
    ));
  return (
    <>
      <div className="container mx-auto my-2">
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
          navigation={true}
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
          {renderTopics(topicArray)}
        </Swiper>
      </div>
    </>
  );
}

export default TopicRecommended;
