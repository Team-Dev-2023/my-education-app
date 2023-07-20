import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function SearchOnTyping() {
  return (
    <div className="inline-flex p-2 items-center rounded-full border-2 border-[#666163]">
      <AiOutlineSearch className="ml-1 opacity-80 text-[30px]" />
      <input
        type="text"
        placeholder="Search for anything"
        className="pl-1  w-full rounded-full border-none focus:outline-none"
      />
    </div>
  );
}

export default SearchOnTyping;
