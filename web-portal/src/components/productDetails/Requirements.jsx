import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

function Requirements(props) {
  const { data } = props;
  return (
    <div className="mb-[32px] color-[#1c1d1f] max-w-[700px]">
      <h2 className="mb-[16px] font-[700] text-[24px]">Requirements</h2>
      <div className="container">
        <ul className="">
          {data.coursePrerequisiteList.map((item) => (
            <div
              key={item.uuid}
              className="flex items-center py-1 w-full h-auto text-left"
            >
              <CircleIcon className="text-[14px] leading-[1.4] !w-2 !mr-4" />
              <li className="min-h-[19.6px] content-center block">
                <span className="text-[#1c1d1f] text-[14px] font-[400]">
                  {item.description}
                </span>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Requirements;
