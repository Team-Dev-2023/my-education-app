import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import qs from "qs";
import useTranslate from "utils/hook/useTranslate";

function CourseDetailPage() {
  const { search } = useLocation();
  const t = useTranslate();
  const navigate = useNavigate();
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  return (
    <div>
      <div>This is detailPage</div>
      <button
        className="bg-[#7a0fe411] rounded-md p-2 mx-2"
        onClick={() => {
          navigate({
            pathname: ROUTES.USER.HOME_PAGE,
            search: query.locale === "vi" ? "?locale=vi" : "",
          });
        }}
      >
        HomePage
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

export default CourseDetailPage;
