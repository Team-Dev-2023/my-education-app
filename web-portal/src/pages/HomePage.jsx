import { useEffect, useState } from "react";
import CarouselListProduct from "components/CarouselListProduct/CarouselListProduct";
import Slider from "components/Slider";
import TopicRecommended from "components/TopicRecommended";
import { getListCourse } from "utils/helpers/workWithApi";

function Homepage() {
  const [listCourse, setListCourse] = useState([]);
  useEffect(() => {
    getListCourse(setListCourse);
  }, []);
  return (
    <div className="flex justify-center items-center flex-wrap w-full xxs:px-[24px]">
      <div className="max-w-[1200px] ">
        <Slider />
        {/* <TopicRecommended topic={}/> */}
      </div>
      <div className="my-[20px] w-full xxs:max-w-full lg:max-w-[1200px] flex justify-center ">
        <CarouselListProduct
          listProduct={listCourse}
          namecarousel={"highCourses"}
        />
      </div>
    </div>
  );
}

export default Homepage;
