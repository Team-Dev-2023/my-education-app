import React from "react";

function Sidebar(props) {
  const { data } = props;
  return (
    <div
      className={`bg-yellow-600 bg-[url(${
        data?.imageUrl ? data.imageUrl : "/"
      })] text-white flex justify-center items-center h-screen w-[340px]`}
    >
      SIDE BAR
    </div>
  );
}

export default Sidebar;
