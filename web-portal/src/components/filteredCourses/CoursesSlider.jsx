import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";

function CoursesSlider({ courses }) {
  //   console.log("courses", courses);
  const navigate = useNavigate();
  //format price
  const formatPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const coursePrice = (course) => {
    return course.price === 0 ? "Free" : formatPrice.format(course.price);
  };
  const discountPrice = (course) =>
    formatPrice.format(course.priceAfterDiscount);

  return (
    <div className="container mx-auto my-2 relative w-full">
      <Swiper
        loop={false}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: `.swiper-button-prev-featured-course`,
          nextEl: `.swiper-button-next-featured-course`,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        {courses.map((course) => (
          <SwiperSlide
            key={course.uuid}
            className="border border-[#d1d7dc] hover:bg-[#f7f9fa] p-[24px] cursor-pointer"
            onClick={() => navigate(`/detail/${course.uuid}`)}
          >
            <div className="flex flex-row">
              <div className="w-[37%] h-full">
                <img
                  src={course.imageUrl}
                  alt="course-img"
                  className="w-full h-full"
                />
              </div>
              <div className="w-[50%] flex-grow flex flex-col justify-start">
                <p className="font-[700] text-[24px] leading-[1.2] mb-[4px]">
                  {course.title}
                </p>
                <p className="font-[400] text-[16px] leading-[1.4] mb-[4px] text-ellipsis overflow-hidden max-h-[60px]">
                  {course.subTitle}
                </p>
                <p className="font-[400] text-[12px] text-[#6a6f73] leading-[1.4] mb-[4px]">
                  By {course.lecturer?.firstName} {course.lecturer?.lastName}
                </p>
                <div className="flex mb-[8px]">
                  <span className="inline-flex items-center">
                    <span className=" text-yellow-600 font-bold mr-[8px]">
                      4.7
                    </span>
                    <Rating
                      value={4}
                      size="small"
                      readOnly
                      color={yellow[800]}
                      emptyIcon={
                        <StarIcon
                          style={{ color: yellow[400] }}
                          fontSize="inherit"
                        />
                      }
                      className="mr-[8px]"
                    />
                  </span>
                  <span className="text-[#6a6f73]">{`(122)`}</span>
                </div>
                <div className="mt-auto">
                  <span className="text-[19px] text-black font-bold leading-[1] mr-[8px]">
                    {course.priceAfterDiscount !== 0
                      ? discountPrice(course)
                      : coursePrice(course)}
                  </span>
                  {course.priceAfterDiscount !== 0 && (
                    <span className="text-[#6a6f73] text-[19px] font-[400] line-through whitespace-nowrap">
                      {coursePrice(course)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`swiper-button-next-featured-course absolute xxs:hidden sm:block top-1/2 translate-y-[-50%] z-10 sm:right-[-20px] `}
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
        className={`swiper-button-prev-featured-course absolute  xxs:hidden sm:block top-1/3 translate-y-1/3 z-10 sm:left-[-20px] `}
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
  );
}

export default CoursesSlider;
