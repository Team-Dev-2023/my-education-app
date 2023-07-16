import React, { useState } from "react";

import Radio from "@mui/material/Radio";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch } from "react-redux";
import { getFilterRatings } from "redux/actions/filterCourses.action";

function Ratings() {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(0);
  const [isVisible, setVisible] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    dispatch(
      getFilterRatings({
        data: event.target.value,
      })
    );
  };
  //   console.log(selectedValue);

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
  });

  return (
    <div className="border-t border-t-[#d1d7dc] mb-[8px]">
      <div className="flex flex-row ">
        <div className="text-[19px] text-[#1c1d1f] leading-[1.2] font-[700] py-[19px]">
          Ratings
        </div>
        <button
          className="ml-auto w-full flex justify-end items-center"
          onClick={() => setVisible((prevState) => !prevState)}
        >
          <span>
            {isVisible ? (
              <KeyboardArrowUpIcon fontSize="small" color="#5624d0" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" color="#5624d0" />
            )}
          </span>
        </button>
      </div>
      {isVisible && (
        <>
          {[4.5, 4.0, 3.5, 3.0].map((item) => (
            <div
              key={item}
              className="flex flex-row items-center ml-[-8px] mb-[-4px]"
            >
              <Radio {...controlProps(String(item))} size="small" />
              <div className="flex flex-row items-center">
                <span className="inline-flex items-center">
                  <Rating
                    value={item}
                    size="small"
                    readOnly
                    color={yellow[1000]}
                    emptyIcon={
                      <StarIcon
                        style={{ color: yellow[500] }}
                        fontSize="inherit"
                      />
                    }
                    className="mr-[8px]"
                  />
                </span>
                <span className="text-[#6a6f73] text-[14px] leading-[1.4] font-[400]">
                  {item.toFixed(1)} & up
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Ratings;
