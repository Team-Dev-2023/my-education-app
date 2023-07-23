import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import { yellow } from "@mui/material/colors";

function CourseRating({ reviewData, rating }) {
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
          <div
            key={item.uuid}
            className="flex flex-col border-t border-t-[#d1d7dc] py-[24px] mr-[16px]"
          >
            <div className="flex flex-row mb-[16px]">
              <img
                src={"https://img-c.udemycdn.com/user/200_H/227936746_23d3.jpg"}
                alt="avatar"
                className="h-[40px] w-[40px] mr-[16px] rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-[16px] font-[700] leading-[1.2] text-[#1c1d1f]">
                  {item.name}
                </p>
                <span className="flex items-center justify-start">
                  <Rating
                    value={item.rating}
                    size="small"
                    readOnly
                    color={yellow[600]}
                    emptyIcon={
                      <StarIcon
                        style={{ color: yellow[100] }}
                        fontSize="inherit"
                      />
                    }
                    className="mt-[4px] mr-[8px]"
                  />
                  <span className="text-[12px] font-[700] leading-[1.2] text-[#6a6f73]">
                    {"5 days"} ago
                  </span>
                </span>
              </div>
            </div>
            <div className="h-[110px] text-ellipsis overflow-hidden whitespace-normal text-[16px] font-[400] leading-[1.4]">
              {item.review}
            </div>
            <button className="underline text-[14px] text-[#000] font-[700] leading-[1.2] h-[40px] mr-auto">
              Show more
            </button>
          </div>
        ))}
        <button className="h-[40px] border border-[#1c1d1f] min-w-[80px] px-[12px] mr-auto hover:bg-[#d1d7dc]">
          <span className="text-[14px] font-[700] leading-[1.2]">
            Show all reviews
          </span>
        </button>
      </div>
    </div>
  );
}

export default CourseRating;
