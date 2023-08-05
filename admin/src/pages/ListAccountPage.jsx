import React from "react";
import SideBar from "components/SideBar";

function ListAccountPage() {
  return (
    <div className="flex mt-1 gap-2 pr-2 mb-4 shadow-md bg-white">
      <SideBar />
      <div className="mt-2 bg-[#bbb5b633] py-2 px-4 w-full">
        <h4 className="mb-4 font-[600] text-[20px]">List Account</h4>
        <ListAccountPage />
      </div>
    </div>
  );
}

export default ListAccountPage;
