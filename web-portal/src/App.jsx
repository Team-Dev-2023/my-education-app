import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./constants/routes";
import HomePage from "./pages/HomePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseListPage from "./pages/CourseListPage";
import { useEffect } from "react";
import Header from "components/Header";
import Footer from "components/Footer";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path={ROUTES.USER.HOME_PAGE} element={<HomePage />} />
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
