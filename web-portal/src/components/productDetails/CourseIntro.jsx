import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { yellow, blueGrey } from "@mui/material/colors";

function CourseIntro(props) {
  const { data } = props;
  return (
    <div className="py-[32px] max-w-[700px] mx-auto">
      <div className=" text-white ">
        <div className="flex flex-nowrap overflow-y-hidden pb-[24px]">
          <span className="text-[#cec0fc] font-[700] text-[14px]">
            {data?.category?.name}{" "}
            <KeyboardArrowRightIcon
              style={{ color: "#cec0fc" }}
              fontSize="inherit"
            />{" "}
            {data?.subCategory?.name}{" "}
            <KeyboardArrowRightIcon
              style={{ color: "#cec0fc" }}
              fontSize="inherit"
            />{" "}
            {data?.topic?.name}
          </span>
        </div>
        <h2 className="text-[32px] leading-[1.2] font-bold mb-[8px]">
          {data?.title}
        </h2>
        <p className="text-[19px] leading-[1.4] mb-[16px] font-[400]">
          {data?.subTitle}
        </p>
        <div className="flex flex-col text-[14px]">
          <a href="/" className="mr-[8px] mb-[8px] flex box-border">
            <span className="inline-flex items-center">
              <span className=" text-yellow-600 font-bold mr-[8px]">4.7</span>
              <Rating
                value={4}
                size="small"
                readOnly
                color={yellow[600]}
                emptyIcon={
                  <StarIcon style={{ color: yellow[100] }} fontSize="inherit" />
                }
                className="mr-[8px]"
              />
            </span>
            <span className="text-[#cec0fc] underline">{`(12213 ratings)`}</span>
          </a>
          <div className="mr-[8px] mb-[8px]">
            <span>
              Created by{" "}
              <a href="/" className="text-[#cec0fc] underline">
                {data?.lecturer?.firstName + " " + data?.lecturer?.lastName}
              </a>
            </span>
          </div>
          <div className="inline-flex items-center gap-2">
            <InfoIcon color="#fff" fontSize="small" className="mt-[2px]" />
            <span>
              Last Update{" "}
              {data?.lastUpdatedAt &&
                data?.lastUpdatedAt.split("-").slice(0, 2).reverse().join("/")}
            </span>
            <LanguageIcon color="#fff" fontSize="small" className="mt-[2px]" />
            <span>Vietnamese</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseIntro;
