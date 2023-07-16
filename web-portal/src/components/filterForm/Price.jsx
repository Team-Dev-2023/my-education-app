import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { flushSync } from "react-dom";
import { getFilterPrice } from "redux/actions/filterCourses.action";

function Price() {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [state, setState] = useState({
    Free: { checked: false, price: "Free" },
    Paid: { checked: false, price: "Paid" },
  });

  const handleChange = (event) => {
    flushSync(() => {
      setState((prevState) => ({
        ...prevState,
        [event.target.name]: {
          ...prevState[event.target.name],
          checked: event.target.checked,
        },
      }));
    });
  };
  console.log("price", [
    ...Object.values(state).filter((item) => item.checked),
  ]);
  dispatch(
    getFilterPrice({
      data: [...Object.values(state).filter((item) => item.checked)],
    })
  );
  // console.log("state", state);

  return (
    <div className="border-t border-t-[#d1d7dc] mb-[8px]">
      <div className="flex flex-row ">
        <div className="text-[19px] text-[#1c1d1f] leading-[1.2] font-[700] py-[19px] whitespace-nowrap">
          Price
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
              key={item.price}
              control={
                <Checkbox
                  checked={item.checked}
                  onChange={handleChange}
                  name={item.price}
                />
              }
              label={item.price}
            />
          ))}
        </FormGroup>
      )}
    </div>
  );
}

export default Price;
