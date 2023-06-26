import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./constants/routes";
import HomePage from "./pages/HomePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseListPage from "./pages/CourseListPage";
import { useEffect } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import RegisterWebLecturer from "pages/RegisterWebLecturer ";
import LoginWebLecturer from "pages/LoginWebLecturer";
import { useDispatch } from "react-redux";
import { getUserInfoAction, logoutAction } from "redux/actions";
require("moment/locale/vi");

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  //GET USER INFO
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken)
      dispatch(
        getUserInfoAction({
          accessToken: accessToken,
        })
      );
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.LECTURE.HOME_PAGE} element={<HomePage />} />
        <Route
          path={ROUTES.LECTURE.REGISTER}
          element={<RegisterWebLecturer />}
        />
        <Route path={ROUTES.LECTURE.LOGIN} element={<LoginWebLecturer />} />

        <Route
          path={ROUTES.LECTURE.LIST_PRODUCT}
          element={<CourseListPage />}
        />
        <Route
          path={ROUTES.LECTURE.DETAIL_PRODUCT}
          element={<CourseDetailPage />}
        />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
