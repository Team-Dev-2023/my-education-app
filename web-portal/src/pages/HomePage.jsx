import useTranslate from "utils/hook/useTranslate";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import { useState } from "react";
import { ROUTES } from "constants/routes";
import CarouselListProduct from "components/CarouselListProduct";
import carouselProducts from "asset/carouselProducts";
import Slider from "components/Slider";

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
      </div>
      <div className="my-[20px] xxs:max-w-full overflow-hidden lg:max-w-[1200px] flex justify-center ">
        <CarouselListProduct
          listProduct={carouselProducts}
          nameCarousel={"recommend"}
        />
      </div>
    </div>
  );
}

export default Homepage;
