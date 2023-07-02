import React from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { sectionTotalLength } from "utils/helpers/totalLengthCalculator.helper";

function Sidebar(props) {
  const { data } = props;
  const imgUrl =
    "https://img-c.udemycdn.com/course/240x135/1501104_967d_13.jpg";
  const itemPrice = "đ 1.299.000";

  return (
    <div className="text-white bg-white flex items-center flex-col w-[340px] mt-[32px] border border-[#d1d7dc] box-border shadow-md">
      <div className="w-full h-full">
        <button className="cursor-pointer block w-full">
          <span>
            <img src={imgUrl} alt="preview" className="w-full" />
          </span>
        </button>
      </div>
      <div className="flex flex-col justify-center items-center absolute h-[190px] w-[340px] bg-gradient-to-b from-transparent to-black">
        <div className="flex justify-center items-center mb-[16px]">
          <PlayCircleFilledWhiteIcon
            className="w-[64px] h-[64px] !text-[64px]"
            fontSize="inherit"
          />
        </div>
        <div className="flex justify-center items-end font-bold text-white text-[16px] leading-[1.2]">
          Preview this course
        </div>
      </div>
      <div className="w-full p-[24px] block box-border">
        <div className="text-start">
          <span className="text-[32px] text-black font-bold leading-[1]">
            {itemPrice}
          </span>
        </div>
        <div className="w-full h-auto mt-[16px]">
          <div className="flex gap-[8px] h-[48px]">
            <button className="bg-[#a435f0] text-white text-[16px] leading-[1.2] font-bold h-full w-full">
              Add to cart
            </button>
            <div className="border border-black h-full w-[52px] flex justify-center items-center">
              <FavoriteBorderIcon style={{ color: "#000000" }} />
            </div>
          </div>
          <div className="h-[48px] mt-[8px] border border-black">
            <button className="text-black text-[16px] leading-[1.2] font-bold h-full w-full">
              Buy now
            </button>
          </div>
        </div>
        <div className="mt-[16px] px-auto text-black">
          <p className="text-[12px] font-[400] leading-[1.2] text-center">
            30-Day Money-Back Guarantee
          </p>
        </div>
        <div className="mt-[16px] px-auto text-black">
          <h2 className="text-[16px] font-bold leading-[1.2] mb-[8px]">
            This course includes:
          </h2>
          <ul className="w-full">
            <li className="py-[4px]">
              <span>
                <OndemandVideoIcon
                  fontSize="inherit"
                  className="!text-[14px] mr-[16px]"
                />
                <span>{`${sectionTotalLength(
                  data.sections,
                )} on-demand video.`}</span>
              </span>
            </li>
            <li className="py-[4px]">
              <span>
                <CodeIcon
                  fontSize="inherit"
                  className="!text-[14px] mr-[16px]"
                />
                <span>{`${1} coding exercise`}</span>
              </span>
            </li>
            <li className="py-[4px]">
              <span>
                <DescriptionIcon
                  fontSize="inherit"
                  className="!text-[14px] mr-[16px]"
                />
                <span>{`${2} articles`}</span>
              </span>
            </li>
            <li className="py-[4px]">
              <span>
                <SimCardDownloadIcon
                  fontSize="inherit"
                  className="!text-[14px] mr-[16px]"
                />
                <span>{`${2} downloadable resources`}</span>
              </span>
            </li>
            <li className="py-[4px]">
              <span>
                <PhoneAndroidIcon
                  fontSize="inherit"
                  className="!text-[14px] mr-[16px]"
                />
                <span>{`Access on mobile and TV`}</span>
              </span>
            </li>
            <li className="py-[4px]">
              <span>
                <AllInclusiveIcon
                  fontSize="inherit"
                  className="!text-[14px] mr-[16px]"
                />
                <span>{`Full lifetime access`}</span>
              </span>
            </li>
          </ul>
        </div>
        <div className="h-[40px] flex flex-nowrap gap-[16px]">
          <button className="h-full flex-grow">
            <span className="font-bold underline text-[14px] text-[#1c1d1f]">
              Share
            </span>
          </button>
          <button className="h-full flex-grow ">
            <span className="font-bold underline text-[14px] text-[#1c1d1f]">
              Gift this course
            </span>
          </button>
          <button className="h-full flex-grow">
            <span className="font-bold underline text-[14px] text-[#1c1d1f]">
              Apply Coupon
            </span>
          </button>
        </div>
      </div>
      {/* SIDE BAR */}
    </div>
  );
}

export default Sidebar;
