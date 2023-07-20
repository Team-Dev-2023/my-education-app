import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { flushSync } from "react-dom";
import { getFilterSubCategory } from "redux/actions/filterCourses.action";

function SubCategory({ subCategories }) {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [inputState, setInputState] = useState(
    subCategories.reduce((obj, item) => {
      obj[item.uuid] = { ...item, checked: false };
      return obj;
    }, {})
  );

  const handleChange = (event) => {
    flushSync(() => {
      setInputState((prevState) => ({
        ...prevState,
        [event.target.name]: {
          ...prevState[event.target.name],
          checked: event.target.checked,
        },
      }));
    });
  };
  // console.log("sub", [
  //   ...Object.values(state).filter((item) => item.checked),
  // ]);
  dispatch(
    getFilterSubCategory({
      data: [...Object.values(inputState).filter((item) => item.checked)],
    })
  );

  // console.log("state", state);

  return (
    <div className="border-t border-t-[#d1d7dc] mb-[8px]">
      <div
        className="flex flex-row cursor-pointer"
        onClick={() => setVisible((prevState) => !prevState)}
      >
        <div className="text-[19px] text-[#1c1d1f] leading-[1.2] font-[700] py-[19px] whitespace-nowrap">
          Subcategory
        </div>
        <button className="ml-auto w-full flex justify-end items-center">
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
        <FormGroup>
          {Object.values(inputState).map((item) => (
            <FormControlLabel
              key={item.uuid}
              control={
                <Checkbox
                  checked={item.checked}
                  onChange={handleChange}
                  name={item.uuid.toString()}
                />
              }
              label={item.name}
            />
          ))}
        </FormGroup>
      )}
    </div>
  );
}

export default SubCategory;
