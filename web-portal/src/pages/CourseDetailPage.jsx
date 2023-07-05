import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import qs from "qs";
import useTranslate from "utils/hook/useTranslate";
import { API_ENDPOINT } from "./../constants/api";
import CourseKnowledgeList from "components/productDetails/CourseKnowledgeList";
import CourseIntro from "components/productDetails/CourseIntro";
import CourseContent from "components/productDetails/CourseContent";
import Requirements from "components/productDetails/Requirements";
import Description from "components/productDetails/Description";
import Sidebar from "components/productDetails/Sidebar";
import BuyerAction from "components/productDetails/BuyerAction";
import TargetLearners from "components/productDetails/TargetLearners";

const api = process.env.REACT_APP_API;
function CourseDetailPage() {
  const { uuid } = useParams();
  const [data, setData] = useState(undefined);
  const [isDivVisible, setDivVisible] = useState(true);
  const t = useTranslate();

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 1080) {
        setDivVisible(true);
      } else {
        setDivVisible(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${api}${API_ENDPOINT.COURSE_DETAIL}/${uuid}`)
      .then((response) => {
        setData((prevData) => ({ ...prevData, ...response.data }));
        console.log("data res", response.data);
      })
      .catch((e) => console.log("error: ", e));
  }, []);

  return (
    <Fragment>
      {data ? (
        <div className="w-full">
          {isDivVisible && (
            <div className="sticky top-0 container mx-auto box-border flex justify-center h-0">
              <div className="w-[70%]"></div>
              <div className="w-[30%]">
                <div className="h-auto ">
                  <Sidebar courseData={data} />
                </div>
              </div>
            </div>
          )}
          <div className=" bg-[#1c1d1f] mb-[32px]">
            <div className="container mx-auto flex justify-center items-center">
              <div className={`${isDivVisible && `w-[70%]`}`}>
                <CourseIntro courseData={data} />
                {!isDivVisible && (
                  <BuyerAction courseData={data} themeColor="white" />
                )}
              </div>
              {isDivVisible && <div className="w-[30%]"></div>}
            </div>
          </div>
          <div className="container mx-auto flex justify-center">
            <div className="w-70%">
              <CourseKnowledgeList
                courseKnowledgeList={data.courseKnowledgeList}
              />
              <CourseContent courseData={data} />
              <Requirements courseData={data} />
              <Description courseData={data} />
              <TargetLearners courseData={data} />
            </div>
            {isDivVisible && <div className="w-[30%]"></div>}
          </div>
        </div>
      ) : (
        <div className="container mx-auto h-32 flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </Fragment>
  );
}

export default CourseDetailPage;
