import { Fragment } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styled/carouselListProduct.css";
import { Navigation } from "swiper";

import ItemCarouseIlListProduct from "./ItemCarouseIlListProduct";

function CarouselListProduct({ listProduct, nameCarousel }) {
  const renderItemSwiper = (arrayItemSwiper) => {
    return arrayItemSwiper.map((item, index) => {
      return (
        <Fragment key={index}>
          <SwiperSlide>
            {<ItemCarouseIlListProduct carouseProduct={item} />}
          </SwiperSlide>
        </Fragment>
      );
    });
  };

  return (
    <div className="w-full  flex justify-center">
      <div className="relative sm:w-[calc(100%-40px)] xxs:w-full  ">
        <Swiper
          // navigation={true}
          modules={[Navigation]}
          // centeredSlides={true}
          grabCursor={true}
          keyboard={{
            enabled: true,
          }}
          navigation={{
            prevEl: `.swiper-button-prev-unique-${nameCarousel}`,
            nextEl: `.swiper-button-next-unique-${nameCarousel}`,
          }}
          breakpoints={{
            1200: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 20,
            },
            980: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 20,
            },
            700: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 20,
            },
            490: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 20,
            },
            330: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 20,
            },
            0: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 20,
            },
          }}
        >
          {renderItemSwiper(listProduct)}
        </Swiper>
        <div
          className={`swiper-button-next-unique-${nameCarousel} absolute xxs:hidden sm:block top-[30px] z-10 sm:right-[-20px] `}
        >
          <button className=" !text-white rounded-[999px] bg-black">
            <img
              className="w-[40px]"
              src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/icon-next-danhmuc.svg"
              alt=""
            />
          </button>
        </div>
        <div
          className={`swiper-button-prev-unique-${nameCarousel} absolute  xxs:hidden sm:block top-[30px] z-10 sm:left-[-20px] `}
        >
          <button className=" !text-white">
            <img
              className="w-[40px] rounded-[999px] bg-black"
              src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/icon-prev-danhmuc.svg"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
}
export default CarouselListProduct;
