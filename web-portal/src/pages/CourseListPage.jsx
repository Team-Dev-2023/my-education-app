import useTranslate from "utils/hook/useTranslate";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import { ROUTES } from "constants/routes";

function CourseListPage() {
  const navigate = useNavigate();
  const t = useTranslate();
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  return (
    <div className="block m-auto">
      <div>This is listPage</div>
      <div>
        <button
          className="bg-[#7a0fe411] rounded-md p-2 mx-2"
          onClick={() => {
            navigate({
              pathname: ROUTES.USER.DETAIL_PRODUCT,
              search: query.locale === "vi" ? "?locale=vi" : "",
            });
          }}
        >
          DetailPage
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

export default CourseListPage;
