import { useLocation } from "react-router-dom";
import en from "../../locales/en";
import vi from "../../locales/vi";
import qs from "qs";

function useTranslate() {
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  const t = query.locale === "vi" ? vi : en;
  return t;
}
export default useTranslate;
