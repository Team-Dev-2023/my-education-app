import TopicRecommended from "components/TopicRecommended";
import React from "react";

function PopularTopics({ topics }) {
  console.log(topics);
  return (
    <div className="mb-[48px]">
      <h2 className="font-[700] text-[24px] leading-[1.2] mb-[16px]">
        Popular Topics
      </h2>
      <TopicRecommended topics={topics} />
      {/* <div>courses slider</div> */}
    </div>
  );
}

export default PopularTopics;
