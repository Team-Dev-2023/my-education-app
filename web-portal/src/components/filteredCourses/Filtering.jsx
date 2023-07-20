import Price from "components/filterForm/Price";
import Ratings from "components/filterForm/Ratings";
import SortBy from "components/filterForm/SortBy";
import SubCategory from "components/filterForm/SubCategory";
import Topic from "components/filterForm/Topic";
import VideoDuration from "components/filterForm/VideoDuration";

function Filtering({ topics, subCategories }) {
  return (
    <div className="w-[280px] flex flex-col pr-[40px] mr-[8px] py-[19px]">
      <SortBy />
      <Ratings />
      <VideoDuration />
      <Topic topics={topics} />
      <SubCategory subCategories={subCategories} />
      <Price />
    </div>
  );
}

export default Filtering;
