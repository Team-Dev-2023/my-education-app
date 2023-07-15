import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SortBy() {
  const [state, setState] = useState("");

  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <div className="mb-[8px] flex flex-col py-[19px]">
      {/* <div className="text-[19px] text-[#1c1d1f] leading-[1.2] font-[700] py-[19px]">
        Sort by
      </div> */}
      <FormControl fullWidth>
        <Select
          value={state}
          onChange={handleChange}
          sx={{
            border: "1px solid black",
            color: "black",
            fontWeight: 700,
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
