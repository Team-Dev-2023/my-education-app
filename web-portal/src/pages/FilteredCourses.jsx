import { CircularProgress } from "@mui/material";
import AllCourses from "components/filteredCourses/AllCourses";
import FeaturedCourses from "components/filteredCourses/FeaturedCourses";
import GetStartedCourses from "components/filteredCourses/GetStartedCourses";
import PopularTopics from "components/filteredCourses/PopularTopics";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCategory,
  getListCourse,
  getSubCategories,
  getTopics,
} from "utils/helpers/workWithApi";

function FilteredCourses() {
  const { category, subcategory, topic } = useParams();
  const sourceName = (topic || subcategory || category).split("-").join(" ");
  // console.log("cate", category, "sub", subcategory, "to", topic);

  const [listCourses, setListCourses] = useState(undefined);
  const [subCategories, setSubCategories] = useState([]);
  const [allTopics, setAllTopics] = useState([]);

  useEffect(() => {
    const allCategories = [];
    const setCategories = (categories) => {
      allCategories.push(...categories);
    };
    const pushSubCategories = async (categories) => {
      const allSubCategories = [];
      const pushAllSubCategoies = (subcategory) => {
        allSubCategories.push(...subcategory);
      };
      for (let index = 0; index < categories.length; index++) {
        const element = categories[index];

        await getSubCategories(element.uuid, pushAllSubCategoies);
      }
      return allSubCategories;
    };
    getCategory(setCategories).then(() => {
      // console.log("all cate", allCategories);
      const categoryInfo = category
        ? allCategories.filter(
            (item) =>
              item.name.toLowerCase() ===
              category.split("-").join(" ").toLowerCase()
          )
        : allCategories;
      pushSubCategories(categoryInfo)
        .then((res) => {
          setSubCategories(res);
        })
        .catch((e) => console.log(e));
    });
  }, []);

  useEffect(() => {
    getListCourse(setListCourses, 1, 20, category, subcategory, topic);
  }, []);
  // console.log("listCourses", listCourses);

  useEffect(() => {
    const pushAllTopics = async (subCategories) => {
      const allTopicsArray = [];
      const setTopics = (topics) => {
        allTopicsArray.push(...topics);
      };
      for (let index = 0; index < subCategories.length; index++) {
        const subCategory = subCategories[index];
        await getTopics(subCategory.uuid, setTopics);
      }
      return allTopicsArray;
    };
    pushAllTopics(subCategories).then((res) => setAllTopics(res));
  }, [subCategories]);
  // console.log("topics", allTopics);

  return (
    <div>
      {listCourses ? (
        <>
          <div className="mx-auto py-[48px] px-[24px] w-full max-w-[1340px]">
            <h1 className="mb-[48px] text-[32px] font-[700] leading-[1.25] capitalize">
              {sourceName} Courses
            </h1>
            <GetStartedCourses courses={listCourses} />
            <FeaturedCourses courses={listCourses} />
            <PopularTopics topics={allTopics} />
            <AllCourses
              courses={listCourses}
              sourceName={sourceName}
              topics={allTopics}
              subCategories={subCategories}
            />
          </div>
        </>
      ) : (
        <div className="container mx-auto h-32 flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default FilteredCourses;
