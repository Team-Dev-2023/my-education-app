import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage";

import PrivateRoute from "hoc/PrivateRoute";
import LoginPage from "pages/Login";

import { ROUTES } from "./constants/routes";
import "./App.css";
import { useEffect } from "react";
import { getUserInfoAction } from "redux/actions";
import ListCoursePage from "pages/ListCoursePage";
import ListAccountPage from "pages/ListAccountPage";
import CoursePreviewPage from "pages/CoursePreviewPage";
import NotFoundPage from "pages/NotFoundPage";
import SubCategoryPage from "pages/SubCategoryPage";
import TopicsPage from "pages/TopicsPage";
import { CategoryPage } from "pages/CategoryPage";
import CreateAccountPage from "pages/CreateAccountPage";

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
            path={ROUTES.ADMIN.LIST_CATEGORIES}
            element={<CategoryPage />}
          />
          <Route
            path={ROUTES.ADMIN.LIST_SUB_CATEGORIES}
            element={<SubCategoryPage />}
          />
          <Route path={ROUTES.ADMIN.LIST_TOPICS} element={<TopicsPage />} />
          <Route
            path={ROUTES.ADMIN.CREATE_ACCOUNT}
            element={<CreateAccountPage />}
          />
          <Route path={ROUTES.ADMIN.HOME_PAGE} element={<HomePage />} />
          <Route
            path={ROUTES.ADMIN.PREVIEW_COURSE}
            element={<CoursePreviewPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
