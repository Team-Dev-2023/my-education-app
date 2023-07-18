import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { getFilterTopic } from "redux/actions/filterCourses.action";
import { flushSync } from "react-dom";

function Topic({ topics }) {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [state, setState] = useState(
    topics.reduce((obj, item) => {
      obj[item.uuid] = { ...item, checked: false };
      return obj;
    }, {})
  );

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
  // console.log("topic", [
  //   ...Object.values(state).filter((item) => item.checked),
  // ]);
  dispatch(
    getFilterTopic({
      data: [...Object.values(state).filter((item) => item.checked)],
    })
  );

  return (
    <div className="border-t border-t-[#d1d7dc] mb-[8px]">
      <div
        className="flex flex-row cursor-pointer"
        onClick={() => setVisible((prevState) => !prevState)}
      >
        <div className="text-[19px] text-[#1c1d1f] leading-[1.2] font-[700] py-[19px] whitespace-nowrap">
          Topic
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
      <div className={`${!isVisible && "hidden"}`}>
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
      </div>
    </div>
  );
}

export default Topic;
