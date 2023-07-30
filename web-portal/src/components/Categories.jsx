// import { Menu } from "antd";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  getCategory,
  getSubCategories,
  getTopics,
} from "utils/helpers/workWithApi";

import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";

export default function FadeMenu() {
  const navigate = useNavigate();
  const [isCategoriesVisible, setCategoriesVisible] = useState(false);
  const [isSubcategoriesVisible, setSubcategoriesVisible] = useState(false);
  const [isTopicVisible, setTopicVisible] = useState(false);

  const [allCategories, setAllCategories] = useState(undefined);
  const [allSubCategories, setAllSubCategories] = useState(undefined);
  const [allTopics, setAllTopics] = useState(undefined);

  const [hoverdCategories, setHoverdCategories] = useState(undefined);
  const [hoverdSubCategories, setHoverdSubCategories] = useState(undefined);
  // Fetch categories
  const handleFetchCategories = () => {
    const categories = [];
    const setCategories = (result) => categories.push(...result);
    getCategory(setCategories).then(() => {
      setAllCategories(categories);
    });
  };
  // Fetch sub-categories
  const handleFetchSubCategories = (categoryUuid) => {
    const subCategories = [];
    const setSubCategories = (result) => subCategories.push(...result);
    getSubCategories(categoryUuid, setSubCategories).then(() => {
      setAllSubCategories(subCategories);
    });
  };
  // Fetch topics
  const handleFetchTopics = (subCategoryUuid) => {
    const topics = [];
    const setTopics = (result) => topics.push(...result);
    getTopics(subCategoryUuid, setTopics).then(() => {
      setAllTopics(topics);
    });
  };

  return (
    <div className="px-3 flex flex-col">
      <button
        className="cursor-pointer text-[16px]"
        onMouseOver={() => {
          handleFetchCategories();
          setCategoriesVisible(true);
        }}
      >
        Categories
      </button>
      <div
        className="absolute z-[1000] mt-11 bg-white flex flex-row"
        onMouseLeave={() => {
          setCategoriesVisible(false);
          setTopicVisible(false);
          setSubcategoriesVisible(false);
        }}
      >
        <div
          className={`flex flex-col w-[260px] h-[335px] py-[8px] border border-gray-300 ${
            isCategoriesVisible ? "visible" : "hidden"
          }`}
        >
          {allCategories ? (
            allCategories
              .sort((a, b) => {
                return Number(a.uuid) < Number(b.uuid) ? 1 : -1;
              })
              .map((item) => (
                <button
                  key={item.uuid}
                  className="cursor-pointer py-[8px] px-[16px] text-left text-[16px] flex flex-row items-center"
                  onClick={() =>
                    navigate(
                      `${ROUTES.USER.FULL_COURSES}/${item.name
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`
                    )
                  }
                  onMouseOver={() => {
                    setHoverdCategories(
                      item.name.toLowerCase().split(" ").join("-")
                    );
                    handleFetchSubCategories(item.uuid);
                    setSubcategoriesVisible(true);
                  }}
                >
                  <p className="mr-auto">{item.name}</p>
                  <ArrowForwardIosIcon
                    className="!text-[12px]"
                    fontSize="inherit"
                  />
                </button>
              ))
          ) : (
            <div className="container mx-auto h-32 flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </div>
        <div
          className={`flex flex-col border w-[260px] py-[8px] border-gray-300 border-l-0 ${
            isSubcategoriesVisible ? "visible" : "hidden"
          }`}
        >
          {allSubCategories ? (
            allSubCategories
              .sort((a, b) => {
                return Number(a.uuid) < Number(b.uuid) ? 1 : -1;
              })
              .map((item) => (
                <button
                  key={item.uuid}
                  className="cursor-pointer py-[8px] px-[16px] text-left text-[16px] flex flex-row items-center"
                  onClick={() =>
                    navigate(
                      `${
                        ROUTES.USER.FULL_COURSES
                      }/${hoverdCategories}/${item.name
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`
                    )
                  }
                  onMouseOver={() => {
                    setHoverdSubCategories(
                      item.name.toLowerCase().split(" ").join("-")
                    );
                    handleFetchTopics(item.uuid);
                    setTopicVisible(true);
                  }}
                >
                  <p className="mr-auto">{item.name}</p>
                  <ArrowForwardIosIcon
                    className="!text-[12px]"
                    fontSize="inherit"
                  />
                </button>
              ))
          ) : (
            <div className="container mx-auto h-32 flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </div>
        <div
          className={`flex flex-col border w-[260px] py-[8px] border-gray-300 border-l-0 ${
            isTopicVisible ? "visible" : "hidden"
          }`}
        >
          {allTopics ? (
            allTopics
              .sort((a, b) => {
                return Number(a.uuid) < Number(b.uuid) ? 1 : -1;
              })
              .map((item) => (
                <button
                  key={item.uuid}
                  className="cursor-pointer py-[8px] px-[16px] text-left text-[16px] flex flex-row items-center"
                  onClick={() =>
                    navigate(
                      `${
                        ROUTES.USER.FULL_COURSES
                      }/${hoverdCategories}/${hoverdSubCategories}/${item.name
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`
                    )
                  }
                >
                  {item.name}
                </button>
              ))
          ) : (
            <div className="container mx-auto h-32 flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
