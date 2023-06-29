import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import CheckIcon from "@mui/icons-material/Check";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { yellow, blueGrey } from "@mui/material/colors";
import { ROUTES } from "constants/routes";
import qs from "qs";
import useTranslate from "utils/hook/useTranslate";
import { API_ENDPOINT } from "./../constants/api";

const api = process.env.REACT_APP_API;
function CourseDetailPage() {
  const { search } = useLocation();
  const [data, setData] = useState({});
  const [togglePrerequisites, setTogglePrerequisites] = useState(false);
  const t = useTranslate();
  const navigate = useNavigate();
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  useEffect(() => {
    console.log("use effect");
    axios
      .get(
        `${api}${
          API_ENDPOINT.COURSE_DETAIL
        }${"/d6639065-d890-4fe4-af0f-a04eb2856fb9"}`,
      )
      .then((response) => {
        setData((prevData) => ({ ...prevData, ...response.data }));
        console.log(response.data);
      })
      .catch((e) => console.log("error: ", e));
  }, []);

  const listPrerequisites = data?.courseKnowledgeList?.map((item) => (
    <li key={item.uuid}>
      <div className="text-[14px] font-[400] my-[4px] flex items-center text-left">
        <CheckIcon
          style={{ color: blueGrey[900] }}
          fontSize="14px"
          className="mr-[16px]"
        />
        <span className="text-sm">{item.description}</span>
      </div>
    </li>
  ));

  const numberOfLectures = data?.sections?.reduce((acu, cur) => {
    acu += cur.lectures.length;
    return acu;
  }, 0);

  console.log("data", data);

  return (
    <div className="flex flex-col justify-center">
      <div className="landing-page font-normal leading-[1.6rem]">
        <div className="sticky float-right w-[320px] mr-[4.8rem] mt-[32px] box-border block">
          <div
            className={`bg-yellow-600 bg-[url(${
              data?.imageUrl ? data.imageUrl : "/"
            })] text-white sticky h-40`}
          >
            SIDE BAR
          </div>
        </div>
        <div className="bg-[#1c1d1f] py-[32px]">
          <div className="container box-border block">
            <div className="max-w-[70rem] mx-[4.8rem] text-white">
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
                <a href="/" className="mr-[8px] flex box-border">
                  <span className="inline-flex items-center">
                    <span className=" text-yellow-600 font-bold mr-[8px]">
                      4.7
                    </span>
                    <Rating
                      value={4}
                      size="small"
                      readOnly
                      color={yellow[600]}
                      emptyIcon={
                        <StarIcon
                          style={{ color: yellow[100] }}
                          fontSize="inherit"
                        />
                      }
                      className="mr-[8px]"
                    />
                  </span>
                  <span className="text-[#cec0fc] underline">{`(12213 ratings)`}</span>
                </a>
                <div className="mr-[8px]">
                  <span>
                    Created by{" "}
                    <a href="/" className="text-[#cec0fc] underline">
                      {data?.createdBy}
                    </a>
                  </span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <InfoIcon
                    color="#fff"
                    fontSize="small"
                    className="mt-[2px]"
                  />
                  <span>
                    Last Update{" "}
                    {data?.lastUpdatedAt &&
                      data?.lastUpdatedAt
                        .split("-")
                        .slice(0, 2)
                        .reverse()
                        .join("/")}
                  </span>
                  <LanguageIcon
                    color="#fff"
                    fontSize="small"
                    className="mt-[2px]"
                  />
                  <span>Vietnamese</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-[24px] self-center">
        <div className="border border-[d1d7dc] py-[24px] color-[#1c1d1f] max-w-[700px] ml-[32px] ">
          <h2 className="mx-[24px] mb-[16px] font-[700] text-[24px]">
            What you'll learn
          </h2>
          <ul
            className={`mx-[24px] grid grid-cols-2 ${
              togglePrerequisites
                ? "overflow-visible h-auto"
                : "overflow-hidden max-h-[215px]"
            }`}
          >
            {listPrerequisites}
          </ul>
          <button
            className="mx-[24px] h-[40px] block"
            onClick={() => setTogglePrerequisites((prevState) => !prevState)}
          >
            {togglePrerequisites ? (
              <span>
                <span className="mr-[4px] font-[700] text-[14px] text-[#5624d0]">
                  Show less
                </span>
                <KeyboardArrowUpIcon fontSize="small" color="#5624d0" />
              </span>
            ) : (
              <span>
                <span className="mr-[4px] font-[700] text-[14px] text-[#5624d0]">
                  Show more
                </span>
                <KeyboardArrowDownIcon fontSize="small" color="#5624d0" />
              </span>
            )}
          </button>
        </div>
        <div className="py-[24px] color-[#1c1d1f] max-w-[700px] ml-[32px">
          <h2 className="mx-[24px] mb-[16px] font-[700] text-[24px]">
            Course content
          </h2>
          <div className="container mx-[24px] py-[24px]">
            <span>
              {data?.sections.length}
              {" sections - "}
              {numberOfLectures}
              {" lectures."}
            </span>
          </div>
          <div className="container mx-[24px] py-[24px]">lectu</div>
        </div>
        <p className="h-20">body</p>
        <p className="h-20">body</p>
      </div>
      {/* <button
        className="bg-[#7a0fe411] rounded-md p-2 mx-2"
        onClick={() => {
          navigate({
            pathname: ROUTES.USER.HOME_PAGE,
            search: query.locale === "vi" ? "?locale=vi" : "",
          });
        }}
      >
        HomePage
      </button>
      <button
        className="bg-[#7a0fe411] rounded-md p-2"
        onClick={() => {
          query.locale === "vi"
            ? navigate({ search: "" })
            : navigate({ search: "?locale=vi" });
        }}
      >
        Language: {t.commons.en}
      </button> */}
    </div>
  );
}

export default CourseDetailPage;
