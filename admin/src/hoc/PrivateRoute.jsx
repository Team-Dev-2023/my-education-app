import Header from "components/Header";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ user, redirectPath, children }) {
  const accessToken = localStorage.getItem("accessToken");

  console.log("user", user);
  console.log(
    "!accessToken && user?.data?.role !== 1",
    !accessToken && user?.data?.role !== 1
  );

  if (!accessToken || user?.data?.role === 2 || user?.data?.role === 3) {
    return <Navigate to={redirectPath} replace />;
  } else if (user?.data?.role === 1) {
    console.log("ccc");
    return children ? (
      children
    ) : (
      <>
        <Header />
        <Outlet />
      </>
    );
  }
}

export default PrivateRoute;
