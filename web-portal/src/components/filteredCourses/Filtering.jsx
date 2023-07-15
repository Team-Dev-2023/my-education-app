import Price from "components/filterForm/Price";
import Ratings from "components/filterForm/Ratings";
import SortBy from "components/filterForm/SortBy";
import SubCategory from "components/filterForm/SubCategory";
import Topic from "components/filterForm/Topic";
import VideoDuration from "components/filterForm/VideoDuration";
import React, { useEffect, useState } from "react";

function Filtering({
  handleSetViewingCourses,
  inputCourses,
  topics,
  subCategories,
}) {
  return (
    <div className="w-[280px] flex flex-col">
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
