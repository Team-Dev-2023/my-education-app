import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseListPage from "./pages/CourseListPage";
import PrivateRoute from "hoc/PrivateRoute";
import LoginPage from "pages/Login";

import Header from "components/Header";
import Footer from "components/Footer";

import { ROUTES } from "./constants/routes";
import "./App.css";

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.ADMIN.LOGIN} element={<LoginPage />} />
        <Route
          element={
            <PrivateRoute user={userInfo} redirectPath={ROUTES.ADMIN.LOGIN} />
          }
        >
          <Route path={ROUTES.ADMIN.HOME_PAGE} element={<HomePage />} />
          <Route
            path={ROUTES.ADMIN.LIST_PRODUCT}
            element={<CourseListPage />}
          />
          <Route
            path={ROUTES.ADMIN.DETAIL_PRODUCT}
            element={<CourseDetailPage />}
          />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
