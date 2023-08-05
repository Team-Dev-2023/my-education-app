import qs from "qs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import useTranslate from "utils/hook/useTranslate";
import { useDispatch } from "react-redux";
import SideBar from "components/SideBar";
import ListCourseAdminPage from "components/ListCourseAdmin";

function Homepage() {
  const t = useTranslate();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const dispatch = useDispatch();
  console.log("query", query);
  return (
    <div className="flex mt-1 gap-2 pr-2 mb-4 shadow-md bg-white">HOME</div>
  );
}

export default Homepage;
