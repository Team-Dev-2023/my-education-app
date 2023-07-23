import { CircularProgress } from "@mui/material";
import axios from "axios";
import CoursesVisible from "components/filteredCourses/CoursesVisible";
import Filtering from "components/filteredCourses/Filtering";
import RelatedSearches from "components/relatedSearches/RelatedSearches";
import { ROUTES } from "constants/routes";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const api = process.env.REACT_APP_API;

function SearchResult() {
  const { query } = useParams();
  // console.log("query", query);
  const [listCourse, setListCourse] = useState(undefined);
  const [topics, setTopics] = useState(undefined);
  const [subCategories, setSubCategories] = useState(undefined);

  const fetchAllCourses = async () => {
    try {
      const response = await axios.get(`${api}${ROUTES.USER.FULL_COURSES}`, {
        params: {
          page: 1,
          perPage: 100,
        },
      });
      return response.data.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const fetchAllTopics = async () => {
    try {
      const response = await axios.get(`${api}${ROUTES.USER.TOPICS}`, {
        params: {
          page: 1,
          perPage: 100,
        },
      });
      return response.data.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const fetchAllSubCategories = async () => {
    try {
      const response = await axios.get(`${api}${ROUTES.USER.SUB_CATEGORIES}`, {
        params: {
          perPage: 100,
        },
      });
      // console.log("sub", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    fetchAllCourses()
      .then((result) => setListCourse(result))
      .catch((e) => console.log(e));
    fetchAllTopics()
      .then((result) => setTopics(result))
      .catch((e) => console.log(e));
    fetchAllSubCategories()
      .then((result) => setSubCategories(result))
      .catch((e) => console.log(e));
  }, []);

  // console.log("list courses", listCourse);
  return (
    <div className="mx-auto py-[48px] px-[24px] w-full max-w-[1340px]">
      <div className="flex flex-col text-[#1c1d1f]">
        <h1 className="text-[32px] font-[700] leading-[1.2] mb-[16px]">
          {`99`} results for "{query}"
        </h1>
        <span className="text-[16px] font-[400] leading-[1.4] ">
          Showing results for "{query}"
        </span>
      </div>
      <div className="flex flex-row">
        {topics && subCategories ? (
          <Filtering topics={topics} subCategories={subCategories} />
        ) : (
          <div className="container mx-auto h-32 flex justify-center items-center">
            <CircularProgress />
          </div>
        )}
        <div className="flex flex-col">
          {listCourse ? (
            <CoursesVisible
              viewableCourses={listCourse.filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
              )}
            />
          ) : (
            <div className="container mx-auto h-32 flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
          {topics && <RelatedSearches topics={topics} />}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
