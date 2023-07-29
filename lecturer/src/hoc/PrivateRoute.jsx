import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ user, redirectPath, children }) {
  if (user.data.role !== 2) {
    return <Navigate to={redirectPath} replace />;
  } else {
    return children ? children : <Outlet />;
  }
}

export default PrivateRoute;
