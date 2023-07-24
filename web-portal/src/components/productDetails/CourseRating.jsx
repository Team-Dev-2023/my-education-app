import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import ReviewModal from "./ReviewModal";
import ReviewItem from "./ReviewItem";
import WritingReview from "./WritingReview";

function CourseRating({ reviewData, rating }) {
  const [open, setOpen] = useState(false);
  const reviewDataSample = [
    {
      name: "Lorem sirun lo",
      avatar: "/",
      uuid: "23",
      rating: 4.4,
      review: `I'm learning so much! The teacher is great, he explains everything so well. I've been struggling to learn more about blueprints for a long time, and now I'm finally understanding a lot of things.`,
    },
    {
      name: "Lorem sirun lo",
      uuid: "43",
      avatar: "/",
      rating: 4.4,
      review: `I'm learning so much! The teacher is great, he explains everything so well. I've been struggling to learn more about blueprints for a long time, and now I'm finally understanding a lot of things.`,
    },
    {
      name: "Lorem sirun lo",
      uuid: "27",
      avatar: "/",
      rating: 4.4,
      review: `I'm learning so much! The teacher is great, he explains everything so well. I've been struggling to learn more about blueprints for a long time, and now I'm finally understanding a lot of things.`,
    },
    {
      name: "Lorem sirun lo",
      uuid: "28",
      avatar: "/",
      rating: 4.4,
      review: `I'm learning so much! The teacher is great, he explains everything so well. I've been struggling to learn more about blueprints for a long time, and now I'm finally understanding a lot of things.`,
    },
    {
      name: "Lorem sirun lo",
      uuid: "29",
      avatar: "/",
      rating: 4.4,
      review: `I'm learning so much! The teacher is great, he explains everything so well. I've been struggling to learn more about blueprints for a long time, and now I'm finally understanding a lot of things.`,
    },
    {
      name: "Lorem sirun lo",
      uuid: "2322",
      avatar: "/",
      rating: 4.4,
      review: `I'm learning so much! The teacher is great, he explains everything so well. I've been struggling to learn more about blueprints for a long time, and now I'm finally understanding a lot of things.`,
    },
    {
      name: "Lorem sirun lo",
      uuid: "2321",
      avatar: "/",
      rating: 4.4,
      review: `I'm learning so much! The teacher is great, he explains everything so well. I've been struggling to learn more about blueprints for a long time, and now I'm finally understanding a lot of things.`,
    },
  ];
  return (
    <div className="mb-[32px] color-[#1c1d1f] max-w-[700px]">
      <h2 className="mb-[16px] text-[24px] flex flex-row">
        <StarIcon fontSize="inherit" className="mr-[4px] text-[#e59819]" />
        <span className="font-[700] text-[24px]">
          {"4.7"} course rating - {"55"} ratings
        </span>
      </h2>
      <div className="grid grid-cols-2">
        {reviewDataSample.slice(0, 4).map((item) => (
          <ReviewItem
            key={item.uuid}
            item={item}
            handleSetOpen={() => setOpen(true)}
          />
        ))}
        <button
          onClick={() => setOpen(true)}
          className="h-[40px] border border-[#1c1d1f] min-w-[80px] px-[12px] mr-auto hover:bg-[#d1d7dc]"
        >
          <span className="text-[14px] font-[700] leading-[1.2]">
            Show all reviews
          </span>
        </button>
      </div>
      <ReviewModal
        open={open}
        handleSetClose={() => setOpen(false)}
        reviewData={reviewDataSample}
      />
      <WritingReview />
    </div>
  );
}

export default CourseRating;
