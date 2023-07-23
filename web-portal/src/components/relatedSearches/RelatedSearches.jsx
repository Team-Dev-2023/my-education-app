import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";

function RelatedSearches({ topics }) {
  //   console.log("topics", topics);
  const navigate = useNavigate();
  return (
    <div className="mt-[16px]">
      <p className="flex justify-start items-center">
        <span className="text-[19px] font-[700] leading-[1.2] mr-2">
          Related searches
        </span>
        <InfoIcon fontSize="small" />
      </p>
      <div className="mt-[8px]">
        {topics.slice(0, 10).map((item) => (
          <button
            key={item.uuid}
            onClick={() =>
              navigate(
                `${ROUTES.USER.TOPIC_PATH}${item.name
                  .toLowerCase()
                  .split(" ")
                  .join("-")}`
              )
            }
            className="rounded-full h-[34px] min-w-[40px] px-[12px] mr-[8px] mt-[8px] text-white text-[14px] font-[700] leading-[1.2] bg-[#1c1d1f] hover:bg-[#3e4143]"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RelatedSearches;
