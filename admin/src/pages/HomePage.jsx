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
    <div className="flex justify-center items-center flex-wrap h-full w-full xxs:px-[24px]">
      <div className="w-12 h-12 border">
        <button onClick={() => dispatch(logoutAction())}>Logout</button>
      </div>
      <button
        className="bg-[#7a0fe411] rounded-md p-2 mx-2"
        onClick={() => {
          navigate({
            pathname: ROUTES.USER.LIST_PRODUCT,
            search: query.locale === "vi" ? "?locale=vi" : "",
          });
        }}
      >
        CourseListPage
      </button>

      <button
        className="bg-[#7a0fe411] rounded-md p-2"
        onClick={() => {
          query.locale === "vi"
            ? navigate({ search: "" })
            : navigate({ search: "?locale=vi" });
        }}
      >
        Language: {t.commons.en}
      </button>
    </div>
  );
}

export default Homepage;
