import { useEffect, useRef, useState } from "react";
import { Rating } from "@mui/material";
import { yellow } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";

function ReviewItem({ item, handleSetOpen }) {
  const reviewDivRef = useRef(undefined);
  const [isShowButton, setShowButton] = useState(false);
  useEffect(() => {
    setShowButton(reviewDivRef.current.clientHeight >= 111);
  }, [reviewDivRef]);
  return (
    <div className="flex flex-col border-t border-t-[#d1d7dc] py-[24px] mr-[16px]">
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
                <StarIcon style={{ color: yellow[100] }} fontSize="inherit" />
              }
              className="mt-[4px] mr-[8px]"
            />
            <span className="text-[12px] font-[700] leading-[1.2] text-[#6a6f73]">
              {"5 days"} ago
            </span>
          </span>
        </div>
      </div>
      <div
        ref={reviewDivRef}
        className={`max-h-[${
          handleSetOpen ? "110px" : "auto"
        }] text-ellipsis overflow-hidden whitespace-normal text-[16px] font-[400] leading-[1.4]`}
      >
        {item.review}
      </div>
      {handleSetOpen && isShowButton && (
        <button
          onClick={handleSetOpen}
          className="underline text-[14px] text-[#000] font-[700] leading-[1.2] h-[40px] mr-auto"
        >
          Show more
        </button>
      )}
    </div>
  );
}

export default ReviewItem;
