import Header from "components/Header";
import SideBar from "components/SideBar";
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ user, redirectPath, children }) {
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  console.log("showSideBar", isShowSideBar);
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken || user?.data?.role === 2 || user?.data?.role === 3) {
    return <Navigate to={redirectPath} replace />;
  } else if (user?.data?.role === 1 || user?.data?.role === 0) {
    return children ? (
      children
    ) : (
      <>
        <Header
          isShowSideBar={isShowSideBar}
          setIsShowSideBar={setIsShowSideBar}
        />
        <div className="flex mt-2">
          <div
            className={`${
              isShowSideBar ? "show-sideBar" : "hidden-sideBar"
            } md:static md:translate-x-[0%]`}
          >
            <SideBar
              showSideBar={isShowSideBar}
              setIsShowSideBar={setIsShowSideBar}
            />
          </div>
          <div className="w-full overflow-y-clip">
            <Outlet />
          </div>
        </div>
      </>
    );
  }
}

export default PrivateRoute;
