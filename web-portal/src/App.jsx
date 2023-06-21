import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./constants/routes";
import HomePage from "./pages/HomePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseListPage from "./pages/CourseListPage";
import { useEffect } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import RegisterWebportal from "./pages/RegisterWebportal ";
import LoginPage from "pages/LoginPage";
import jwtDecode from "jwt-decode";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getUserInfoAction, logoutAction } from "redux/actions";
require("moment/locale/vi");

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  //SCROLL ON TOP WHEN CHANGE PAGE
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  //GET TIME NOW
  let now = Math.round(new Date().getTime() / 1000);
  //GET USER INFO
  useEffect(() => {
    let accessTokenLocal = localStorage.getItem("accessToken");
    if (accessTokenLocal) {
      let decoded = jwtDecode(accessTokenLocal);
      now >= decoded.exp
        ? dispatch(logoutAction()) && localStorage.removeItem("accessToken")
        : dispatch(
            getUserInfoAction({
              accessTokenLocal: accessTokenLocal,
            })
          );
    }
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.USER.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES.USER.REGISTER} element={<RegisterWebportal />} />
        <Route path={ROUTES.USER.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.USER.LIST_PRODUCT} element={<CourseListPage />} />
        <Route
          path={ROUTES.USER.DETAIL_PRODUCT}
          element={<CourseDetailPage />}
        />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
