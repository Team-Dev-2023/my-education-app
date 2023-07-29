import React, { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
let countries = require("../../asset/countries_v1.json");

function SelectCountry({ handleSetCountry }) {
  const [countrySelected, setCountrySelected] = useState("Vietnam");

  useEffect(() => {
    handleSetCountry(countrySelected);
  }, [countrySelected]);

  return (
    <>
      <h2 className="text-[24px] font-bold leading-5 mb-[16px]">
        Billing address
      </h2>
      <div className="flex flex-row items-center max-w-[264px] mb-2">
        <span className="text-[14px] font-bold leading-5 pb-2">Country</span>
        <span className="text-[#6a6f73] text-[14px] leading-6 font-normal ml-auto">
          Required
        </span>
      </div>
      <Select
        className="w-[264px] !rounded-none border border-[#1c1d1f] h-12 mb-2"
        value={countrySelected}
        label="country"
        onChange={(event) => setCountrySelected(event.target.value)}
      >
        {countries.map((item) => (
          <MenuItem key={item.value} value={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <p className="text-[#6a6f73] text-[12px] leading-4 font-normal mb-[32px]">
        Udemy is required by law to collect applicable transaction taxes for
        purchases made in certain tax jurisdictions.
      </p>
    </>
  );
}

export default SelectCountry;
