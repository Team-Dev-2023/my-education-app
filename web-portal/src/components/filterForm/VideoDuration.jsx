import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { getFilterVideoDuration } from "redux/actions/filterCourses.action";
import { flushSync } from "react-dom";

function VideoDuration() {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [state, setState] = useState({
    3600: { checked: false, min: 0, max: 3600 },
    10800: { checked: false, min: 3600, max: 10800 },
    21600: { checked: false, min: 10800, max: 21600 },
    61200: { checked: false, min: 21600, max: 61200 },
    9007199254740991: {
      checked: false,
      min: 61200,
      max: Number.MAX_SAFE_INTEGER,
    },
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
  dispatch(
    getFilterVideoDuration({
      data: [...Object.values(state).filter((item) => item.checked)],
    })
  );

  return (
    <div className="border-t border-t-[#d1d7dc] mb-[8px]">
      <div className="flex flex-row ">
        <div className="text-[19px] text-[#1c1d1f] leading-[1.2] font-[700] py-[19px] whitespace-nowrap">
          Video Duration
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
              key={item.max}
              control={
                <Checkbox
                  checked={item.checked}
                  onChange={handleChange}
                  name={item.max.toString()}
                />
              }
              label={`${
                item.max < 3600 * 18
                  ? `${item.min / 3600} - ${item.max / 3600}`
                  : `17+`
              } Hours`}
            />
          ))}
        </FormGroup>
      )}
    </div>
  );
}

export default VideoDuration;
