import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseListPage from "./pages/CourseListPage";
import PrivateRoute from "hoc/PrivateRoute";
import LoginPage from "pages/Login";

import Header from "components/Header";
import Footer from "components/Footer";

import { ROUTES } from "./constants/routes";
import "./App.css";
import NoHeaderLayout from "layout/NoHeaderLayout";
import MainLayout from "layout/MainLayout";
import { useEffect } from "react";
import { getUserInfoAction } from "redux/actions";
import ListCoursePage from "pages/ListCoursePage";
import ListAccountPage from "pages/ListAccountPage";

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  //GET USER INFO
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken)
      dispatch(
        getUserInfoAction({
          accessToken: accessToken,
        })
      );
  }, []);
  return (
    <>
      <Routes>
        <Route path={ROUTES.ADMIN.LOGIN} element={<LoginPage />} />

        <Route
          element={
            <PrivateRoute user={userInfo} redirectPath={ROUTES.ADMIN.LOGIN} />
          }
        >
          <Route path={ROUTES.ADMIN.LIST_COURSE} element={<ListCoursePage />} />
          <Route
            path={ROUTES.ADMIN.LIST_ACCOUNT}
            element={<ListAccountPage />}
          />

          <Route
            path={ROUTES.ADMIN.DETAIL_PRODUCT}
            element={<CourseDetailPage />}
          />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  );
}

export default App;
