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

const api = process.env.REACT_APP_API;
function CourseDetailPage() {
  const { search } = useLocation();
  const [data, setData] = useState(undefined);
  const dispatch = useDispatch();
  const [togglePrerequisites, setTogglePrerequisites] = useState(false);
  const t = useTranslate();
  const navigate = useNavigate();
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  console.log(
    `${api}${
      API_ENDPOINT.COURSE_DETAIL
    }${"/504bc76c-85dc-4ea1-b3e2-6ac5ceca4085"}`,
  );
  useEffect(() => {
    console.log("effect");
    axios
      .get(
        `${api}${
          API_ENDPOINT.COURSE_DETAIL
        }${"/504bc76c-85dc-4ea1-b3e2-6ac5ceca4085"}`,
      )
      .then((response) => {
        setData((prevData) => ({ ...prevData, ...response.data }));
        console.log(response.data);
      })
      .catch((e) => console.log("error: ", e));
  }, []);

  console.log("data", data);

  return (
    <Fragment>
      {data ? (
        <div className="flex flex-col justify-center">
          <div className="font-normal leading-[1.6rem]">
            <div className="sticky float-right w-[320px] mr-[4.8rem] mt-[32px] box-border block">
              <div
                className={`bg-yellow-600 bg-[url(${
                  data?.imageUrl ? data.imageUrl : "/"
                })] text-white sticky h-40`}
              >
                SIDE BAR
              </div>
            </div>
            <CourseIntro data={data} />
          </div>
          <div className="container mt-[24px] self-center">
            <CourseKnowledgeList
              courseKnowledgeList={data?.courseKnowledgeList}
            />
            <CourseContent data={data} />
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </Fragment>
  );
}

export default CourseDetailPage;
