import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles/Slide.css";
import { Navigation } from "swiper";

import slide01 from "../asset/slide01.jpg";
import slide02 from "../asset/slide02.jpg";

export default function Slider() {
  const innerDivStyleSlide01 = {
    maxWidth: "100%",
    maxHeight: "100%",
    backgroundImage: `url(${slide01})`,
  };
  const innerDivStyleSlide02 = {
    maxWidth: "100%",
    maxHeight: "100%",
    backgroundImage: `url(${slide02})`,
  };
  return (
    <>
      <Swiper
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="swiper-slide mx-auto flex justify-center">
            <div
              style={innerDivStyleSlide01}
              className="inner-slide-div mx-auto flex sm:justify-start"
            >
              <div
                className="shadow-sm p-6 flex flex-col w-96 h-36
                my-auto mx-auto ml-8 sm:mx-10 sm:my-10 md:mx-14 md:my-14 xl:mx-20 xl:my-20  
               bg-white"
              >
                <h3 className="text-black text-3xl h-12 font-serif font-semibold ">
                  Learn from anywhere
                </h3>
                <p>
                  On the couch, from the backyard, or on your commute. Our app
                  lets you decide.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide flex justify-center">
            <div
              style={innerDivStyleSlide02}
              className="inner-slide-div mx-auto flex sm:justify-start sm:h-1/4 md:h-1/3 xl:h-2/5"
            >
              <div
                className="shadow-sm p-6 flex flex-col w-96 h-36
                my-auto mx-auto ml-8 sm:mx-10 sm:my-10 md:mx-14 md:my-14 xl:mx-20 xl:my-20  
               bg-white"
              >
                <h3 className="text-black text-3xl h-12 font-serif font-semibold ">
                  Code your future
                </h3>
                <p>
                  Take control of your career. Learn the latest skills in web
                  development.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
