import useTranslate from "utils/hook/useTranslate";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import { useState } from "react";
import { ROUTES } from "constants/routes";
import CarouselListProduct from "components/CarouselListProduct";
import carouselProducts from "asset/carouselProducts";
import Slider from "components/Slider";
import TopicRecommended from "components/TopicRecommended";

function Homepage() {
  const t = useTranslate();

  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  return (
    <div className="flex justify-center items-center flex-wrap w-full xxs:px-[24px]">
      <div className="max-w-[1200px] ">
        <Slider />
        <TopicRecommended />
      </div>
      <div className="my-[20px] xxs:max-w-full overflow-hidden lg:max-w-[1200px] flex justify-center ">
        <CarouselListProduct
          listProduct={carouselProducts}
          nameCarousel={"highly"}
        />
      </div>
      {/* <button
        className="bg-[#7a0fe411] rounded-md p-2 mx-2"
        onClick={() => {
          navigate({
            pathname: ROUTES.USER.LIST_PRODUCT,
            search: query.locale === "vi" ? "?locale=vi" : "",
          });
        }}
      >
        CourseListPage
      </button>

      <button
        className="bg-[#7a0fe411] rounded-md p-2"
        onClick={() => {
          query.locale === "vi"
            ? navigate({ search: "" })
            : navigate({ search: "?locale=vi" });
        }}
      >
        Language: {t.commons.en}
      </button> */}
    </div>
  );
}

export default Homepage;
