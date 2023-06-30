import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./constants/routes";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import RegisterWebLecturer from "pages/RegisterWebLecturer ";
import LoginWebLecturer from "pages/LoginWebLecturer";
import { useDispatch } from "react-redux";
import { getUserInfoAction } from "redux/actions";
import MainLayout from "layout/MainLayout";
import NoHeaderLayout from "layout/NoHeaderLayout";
import ChangeGoalsCoursePage from "pages/ChangeGoalsCoursePage";
import ChangeInfoCoursePage from "pages/ChangeInfoCoursePage";
import Courses from "pages/Courses";
import CreateCoursePage from "pages/CreateCoursePage";
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
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.LECTURE.HOME_PAGE} element={<HomePage />} />
          <Route
            path={ROUTES.LECTURE.REGISTER}
            element={<RegisterWebLecturer />}
          />
          <Route path={ROUTES.LECTURE.LOGIN} element={<LoginWebLecturer />} />

          <Route path="*" element={<div>404</div>} />
        </Route>
        <Route element={<NoHeaderLayout />}>
          <Route path={ROUTES.LECTURE.COURSES} element={<Courses />} />
          <Route
            path={ROUTES.LECTURE.CREATE_COURSE}
            element={<CreateCoursePage />}
          />

          <Route
            path={ROUTES.LECTURE.CHANGE_INFO_COURSE}
            element={<ChangeInfoCoursePage />}
          />
          <Route
            path={ROUTES.LECTURE.CHANGE_GOALS_COURSE}
            element={<ChangeGoalsCoursePage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
