import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { getCategory, getSubCategories } from "utils/helpers/workWithApi";
import { ROUTES } from "constants/routes";

function HorizontalMenuDropdown() {
  const navigate = useNavigate();

  const [isSubcategoriesVisible, setSubcategoriesVisible] = useState(false);
  const [hoverdCategories, setHoverdCategories] = useState(undefined);

  const [allCategories, setAllCategories] = useState(undefined);
  const [allSubCategories, setAllSubCategories] = useState(undefined);

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
  useEffect(() => {
    handleFetchCategories();
  }, []);

  return (
    <div
      onMouseLeave={() => {
        setHoverdCategories(false);
        setSubcategoriesVisible(false);
      }}
    >
      <div className="shadow-md w-full h-14">
        <div className="container mx-auto flex flex-wrap justify-center items-center overflow-y-hidden h-full">
          {allCategories ? (
            allCategories.map((item) => (
              <div
                onMouseOver={() => {
                  setHoverdCategories(
                    item.name.toLowerCase().split(" ").join("-")
                  );
                  setSubcategoriesVisible(true);
                  handleFetchSubCategories(item.uuid);
                }}
                onClick={() =>
                  navigate(
                    `${ROUTES.USER.FULL_COURSES}/${item.name
                      .toLowerCase()
                      .split(" ")
                      .join("-")}`
                  )
                }
                className="relative inline-flex justify-center items-center py-[8px] px-[16px] cursor-pointer h-full"
                key={item.uuid}
              >
                {item.name}
                <ArrowDropUpIcon
                  className={`absolute top-[75%] left-[50%] translate-x-[-50%] ${
                    hoverdCategories ===
                    item.name.toLowerCase().split(" ").join("-")
                      ? "!visible"
                      : "!hidden"
                  }`}
                  fontSize="medium"
                />
              </div>
            ))
          ) : (
            <p>Loading categories</p>
          )}
        </div>
      </div>
      <div
        className={`bg-[#1C1D1F] absolute z-[500] left-[50%] translate-x-[-50%] h-14 w-full flex flex-row justify-center items-center ${
          isSubcategoriesVisible ? "visible" : "hidden"
        }`}
      >
        {allSubCategories ? (
          allSubCategories.map((item) => (
            <div
              onClick={() =>
                navigate(
                  `${ROUTES.USER.FULL_COURSES}/${hoverdCategories}/${item.name
                    .toLowerCase()
                    .split(" ")
                    .join("-")}`
                )
              }
              key={item.uuid}
              className="h-full py-[8px] px-[16px] cursor-pointer text-center text-[16px] text-white leading-loose"
            >
              {item.name}
            </div>
          ))
        ) : (
          <p>Loading sub-categories</p>
        )}
      </div>
    </div>
  );
}

export default HorizontalMenuDropdown;
