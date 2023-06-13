import useTranslate from "utils/hook/useTranslate";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import { useState } from "react";
import { ROUTES } from "constants/routes";
import Slider from "components/Slider";

function Homepage() {
  const t = useTranslate();

  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  return (
    <div className="block m-auto">
      <Slider />
      <div>This is HomePage</div>
      <div>
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
    </div>
  );
}

export default Homepage;
