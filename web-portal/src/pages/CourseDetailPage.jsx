import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { ROUTES } from "constants/routes";
import qs from "qs";
import useTranslate from "utils/hook/useTranslate";
import { API_ENDPOINT } from "./../constants/api";
import CourseKnowledgeList from "components/productDetails/CourseKnowledgeList";
import CourseIntro from "components/productDetails/CourseIntro";
import CourseContent from "components/productDetails/CourseContent";
import Requirements from "components/productDetails/Requirements";
import Description from "components/productDetails/Description";
import Recommendation from "components/productDetails/Recommendation";
import Sidebar from "components/productDetails/Sidebar";

const api = process.env.REACT_APP_API;
function CourseDetailPage() {
  const { search } = useLocation();
  const [data, setData] = useState(undefined);
  const dispatch = useDispatch();
  const [togglePrerequisites, setTogglePrerequisites] = useState(false);
  const t = useTranslate();
  const navigate = useNavigate();
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  useEffect(() => {
    axios
      .get(
        `${api}${
          API_ENDPOINT.COURSE_DETAIL
        }${"/504bc76c-85dc-4ea1-b3e2-6ac5ceca4085"}`,
      )
      .then((response) => {
        setData((prevData) => ({ ...prevData, ...response.data }));
        console.log("data", response.data);
      })
      .catch((e) => console.log("error: ", e));
  }, []);

  return (
    <Fragment>
      {data ? (
        <div className="w-full">
          <div className="sticky top-0 container mx-auto box-border flex justify-center h-0">
            <div className="w-[70%]"></div>
            <div className="w-[30%]">
              <div className="h-auto ">
                <Sidebar data={data} />
              </div>
            </div>
          </div>
          <div className=" bg-[#1c1d1f] mb-[32px]">
            <div className="container mx-auto flex justify-center items-center">
              <div className="w-[70%]">
                <CourseIntro data={data} />
              </div>
              <div className="w-[30%]"></div>
            </div>
          </div>
          <div className="container mx-auto flex justify-center">
            <div className="w-70%">
              <CourseKnowledgeList
                courseKnowledgeList={data.courseKnowledgeList}
              />
              <CourseContent data={data} />
              <Requirements data={data} />
              <Description data={data} />
              <Recommendation data={data} />
            </div>
            <div className="w-[30%]"></div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto h-screen">
          <CircularProgress />
        </div>
      )}
    </Fragment>
  );
}

export default CourseDetailPage;
