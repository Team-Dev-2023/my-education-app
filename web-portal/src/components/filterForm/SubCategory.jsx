import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

function SubCategory({ subCategories }) {
  const [isVisible, setVisible] = useState(false);
  const [state, setState] = useState(
    subCategories.reduce((obj, item) => {
      obj[item.uuid] = { ...item, checked: false };
      return obj;
    }, {})
  );

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: {
        ...prevState[event.target.name],
        checked: event.target.checked,
      },
    }));
  };
  // console.log("state", state);

  return (
    <div className="border-t border-t-[#d1d7dc] mb-[8px]">
      <div className="flex flex-row ">
        <div className="text-[19px] text-[#1c1d1f] leading-[1.2] font-[700] py-[19px] whitespace-nowrap">
          Subcategory
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
        <FormGroup>
          {Object.values(state).map((item) => (
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
