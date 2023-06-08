import { Routes, Route, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./page/Homepage";
import CourseDetailPage from "./page/CourseDetailPage";
import CourseListPage from "./page/CourseListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/courseList" element={<CourseListPage />} />
        <Route path="/detail" element={<CourseDetailPage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
