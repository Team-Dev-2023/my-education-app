import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./constants/routes";
import HomePage from "./pages/HomePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseListPage from "./pages/CourseListPage";
import { useEffect } from "react";
import Header from "components/Header/Header";
import Footer from "components/Footer";
import RegisterWebportal from "./pages/RegisterWebportal ";
import LoginPage from "pages/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoAction, logoutAction } from "redux/actions";
import PrivateRoute from "./hoc/PrivateRoutes";
import LearningPage from "pages/LearningPage";
import FilteredCourses from "pages/FilteredCourses";
import Cart from "pages/Cart";
import { getListCartAction } from "redux/actions/cart.action";
import EditProfile from "pages/EditProfile";
require("moment/locale/vi");

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  //SCROLL ON TOP WHEN CHANGE PAGE
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
    dispatch(
      getListCartAction({
        accessToken: accessToken,
      })
    );
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.USER.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES.USER.REGISTER} element={<RegisterWebportal />} />
        <Route path={ROUTES.USER.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.USER.LIST_PRODUCT} element={<CourseListPage />} />
        <Route path={ROUTES.USER.COURSES} element={<FilteredCourses />} />
        <Route path={ROUTES.USER.TOPIC} element={<FilteredCourses />} />
        <Route
          path={ROUTES.USER.DETAIL_PRODUCT}
          element={<CourseDetailPage />}
        />
        <Route path={ROUTES.USER.CART} element={<Cart />} />
        <Route path={ROUTES.USER.EDIT_PROFILE} element={<EditProfile />} />

        <Route
          element={
            <PrivateRoute user={userInfo} redirectPath={ROUTES.USER.LOGIN} />
          }
        >
          <Route path={ROUTES.USER.LEARNING} element={<LearningPage />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
