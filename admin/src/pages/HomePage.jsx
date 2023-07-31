import qs from "qs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import useTranslate from "utils/hook/useTranslate";
import { useDispatch } from "react-redux";
import { logoutAction } from "redux/actions";

function Homepage() {
  const t = useTranslate();

  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();

  return (
    <div className="flex">
      <div className="max-w-[200px] w-full max-h-[100vh]  shadow-lg">
        dashboard
      </div>
      <div className="flex flex-1"> main</div>
    </div>
  );
}

export default Homepage;
