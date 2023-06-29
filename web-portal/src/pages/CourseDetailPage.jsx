import { useLocation, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import CheckIcon from "@mui/icons-material/Check";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { yellow, blueGrey } from "@mui/material/colors";
import { ROUTES } from "constants/routes";
import qs from "qs";
import useTranslate from "utils/hook/useTranslate";
import axios from "axios";
import { API_ENDPOINT } from "./../constants/api";
import { useEffect, useState } from "react";

function CourseDetailPage() {
  const { search } = useLocation();
  const [data, setData] = useState({});
  const [togglePrerequisites, setTogglePrerequisites] = useState(false);
  const t = useTranslate();
  const navigate = useNavigate();
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const api = process.env.REACT_APP_API;

  useEffect(() => {
    axios
      .get(
        `${api}${
          API_ENDPOINT.COURSE_DETAIL
        }${"/6c89f06d-a4da-43aa-b227-08f95a3120d7"}`,
      )
      .then((res) => {
        setData((prevData) => ({ ...prevData, ...res.data }));
      });
  }, []);
  const prerequisitesSample = [
    {
      uuid: "wrsdfsdcxc",
      name: "All core features and concepts you need to know in modern JavaScript development",
    },
    {
      uuid: "wrsd123dcxc",
      name: "Project-driven learning with plenty of examples",
    },
    {
      uuid: "wr123fsdcxc",
      name: "All about variables, functions, objects and arrays",
    },
    {
      uuid: "wr1wercs312xc",
      name: "Everything you need to become a JavaScript expert and apply for JavaScript jobs",
    },
    {
      uuid: "wr123fs3tyuc",
      name: "Manipulating web pages (= the DOM) with JavaScript",
    },
    {
      uuid: "wuty23fs312xc",
      name: "Meta-programming, performance optimization, memory leak busting",
    },
    {
      uuid: "wr12yut12xc",
      name: "Event handling, asynchronous coding and Http requests",
    },
    {
      uuid: "wr1567dcxc",
      name: "Learn JavaScript from scratch and in great detail - from beginner to advanced",
    },
    {
      uuid: "w56723dcxc",
      name: "Learn JavaScript from scratch and in great detail - from beginner to advanced",
    },
    {
      uuid: "wr1123d345c",
      name: "Learn JavaScript from scratch and in great detail - from beginner to advanced",
    },
    {
      uuid: "wr1123cvbq1c",
      name: "Learn JavaScript from scratch and in great detail - from beginner to advanced",
    },
  ];
  const listPrerequisites = prerequisitesSample.map((item) => (
    <li key={item.uuid}>
      <div className="text-[14px] font-[400] my-[4px] flex items-center text-left">
        <CheckIcon
          style={{ color: blueGrey[900] }}
          fontSize="14px"
          className="mr-[16px]"
        />
        <span className="text-sm">{item.name}</span>
      </div>
    </li>
  ));

  console.log(data);

  return (
    <div className="flex flex-col justify-center">
      <div className="landing-page font-normal leading-[1.6rem]">
        <div className="sticky float-right w-[320px] mr-[4.8rem] mt-[32px] box-border block">
          <div
            className={`bg-yellow-600 bg-[url(${
              data?.imageUrl ? data.imageUrl : "/"
            })] text-white sticky`}
          >
            SIDE BAR
          </div>
        </div>
        <div className="bg-[#1c1d1f] py-[32px]">
          <div className="container box-border block">
            <div className="max-w-[70rem] mx-[4.8rem] text-white">
              <div className="flex flex-nowrap overflow-y-hidden pb-[24px]">
                {data?.topic?.name}
              </div>
              <h2 className="text-[32px] font-bold mb-[8px]">{data.title}</h2>
              <p className="text-[19px] mb-[16px] font-[400]">
                {data.description}
              </p>
              <div className="flex flex-col text-[14px]">
                <a href="/" className="mr-[8px] box-border">
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
                </a>
                <span>{`12213 ratings`}</span>
                <div className="mr-[8px]">
                  <span>
                    Created by{" "}
                    <a href="/" className="text-[#cec0fc]">
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
