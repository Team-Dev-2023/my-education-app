import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/carouselListProduct.css";

import ItemCarouseIlListProduct from "./ItemCarouseIlListProduct";

function CarouselListProduct({ listProduct, name_carousel }) {
  const renderItemSwiper = (arrayItemSwiper) => {
    return arrayItemSwiper?.map((item) => {
      return (
        <Fragment key={item.uuid}>
          <SwiperSlide key={item.uuid}>
            <ItemCarouseIlListProduct carouseProduct={item} />
          </SwiperSlide>
        </Fragment>
      );
    });
  };

  return (
    <div className="container w-full flex justify-center">
      <div className="relative w-full  ">
        <Swiper
          // navigation={true}
          modules={[Navigation]}
          name_carousel={"carouselProducts"}
          // centeredSlides={true}
          grabCursor={true}
          keyboard={{
            enabled: true,
          }}
          navigation={{
            prevEl: `.swiper-button-prev-unique-${name_carousel}`,
            nextEl: `.swiper-button-next-unique-${name_carousel}`,
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
          className={`swiper-button-next-unique-${name_carousel}  absolute 
          xxs:hidden sm:block top-[45px] z-10 sm:right-[-20px] `}
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
          className={`swiper-button-prev-unique-${name_carousel} absolute 
           xxs:hidden sm:block top-[45px] z-10 sm:left-[-20px] `}
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
    </div>
  );
}
export default CarouselListProduct;
