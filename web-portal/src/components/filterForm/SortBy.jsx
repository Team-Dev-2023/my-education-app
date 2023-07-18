import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { getFilterSortBy } from "redux/actions/filterCourses.action";

function SortBy() {
  const dispatch = useDispatch();
  const [state, setState] = useState("Newest");

  const handleChange = (event) => {
    setState(event.target.value);
    console.log("sort", typeof event.target.value);
    dispatch(
      getFilterSortBy({
        data: event.target.value,
      })
    );
  };

  // console.log("sort", sortByFilter);

  return (
    <div className="mb-[8px] flex flex-row pt-[19px]">
      <div className="text-[19px] text-[#1c1d1f] leading-[1.2] font-[700] py-[19px] mr-[10px] whitespace-nowrap">
        Sort by:
      </div>
      <FormControl fullWidth>
        <Select
          value={state}
          onChange={handleChange}
          sx={{
            // border: "1px solid black",
            color: "black",
            fontWeight: 400,
            fontSize: 19,
          }}
        >
          <MenuItem value={"Highest Rate"} sx={{ color: "black" }}>
            Highest Rate
          </MenuItem>
          <MenuItem value={"Newest"} sx={{ color: "black" }}>
            Newest
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
export default SortBy;
