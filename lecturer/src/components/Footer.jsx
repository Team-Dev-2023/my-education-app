import useTranslate from "utils/hook/useTranslate";
import { Link, generatePath, useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import { Fragment, useState } from "react";
import { ROUTES } from "constants/routes";
import { TfiWorld } from "react-icons/tfi";
function Footer() {
  const t = useTranslate();
  let leftButtomFooter = [
    { content: t.leftBottomFooter.about, route: "#" },
    { content: t.leftBottomFooter.contact, route: "#" },
    { content: t.leftBottomFooter.udemy_Business, route: "#" },
    { content: t.leftBottomFooter.download_app, route: "#" },
    { content: t.leftBottomFooter.teach, route: "#" },
  ];
  let centerButtomFooter = [
    { content: t.centerBottomFooter.career, route: "#" },
    { content: t.centerBottomFooter.blog, route: "#" },
    { content: t.centerBottomFooter.help, route: "#" },
    { content: t.centerBottomFooter.affiliate, route: "#" },
    { content: t.centerBottomFooter.investors, route: "#" },
  ];
  let rightButtomFooter = [
    { content: t.rightBottomFooter.terms, route: "#" },
    { content: t.rightBottomFooter.privacy_policy, route: "#" },
    { content: t.rightBottomFooter.cookie, route: "#" },
    { content: t.rightBottomFooter.sitemap, route: "#" },
    { content: t.rightBottomFooter.accessibility_statement, route: "#" },
  ];
  const renderListTitleFooter = (array) => {
    return array.map((item, index) => {
      return (
        <li key={index} className="w-full">
          <Link to={item.route} className="text-white ">
            {item.content}
          </Link>
        </li>
      );
    });
  };

  const navigate = useNavigate();
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  return (
    <div className="Footer px-[24px] bg-[#1c1d1f] py-2">
      <div className="w-full md:flex xxs:inline mt-2 py-4 justify-between ">
        <div className="xxs:w-full flex flex-wrap gap-3">
          <h4 className="text-[20px] w-full text-white">{t.topFooter.title}</h4>
          <h1 className="text-white">{t.topFooter.content}</h1>
        </div>
        <button className="h-[48px] md:min-w-fit xxs:w-full md:w-0 xxs:my-2 inline-block text-white font-[500]  border-[0.8px] border-white px-3 py-2">
          {t.topFooter.button}
        </button>
      </div>
      <div className="w-full flex xxs:flex-wrap xl:flex-nowrap  items-center mt-2 py-4 justify-between border-t-[0.8px] border-[#3e4143]">
        <div className="xxs:w-full xl:w-auto">
          <span className=" text-white text-[20px]">
            {t.middleFooter.left_Title}

            <Link className="text-[20px]  mx-2 text-center text-[#cec0fc]">
              {t.middleFooter.center_Title}
            </Link>

            {t.middleFooter.right_Title}
          </span>
        </div>
        <div className="xxs:w-full xl:w-auto xxs:block sm:flex sm:justify-evenly pt-4 lg:gap-4">
          <img
            src="https://s.udemycdn.com/partner-logos/v4/nasdaq-light.svg"
            alt="imgCompanyHeader"
          />
          <img
            src="https://s.udemycdn.com/partner-logos/v4/volkswagen-light.svg"
            alt="imgCompanyHeader"
          />
          <img
            src="https://s.udemycdn.com/partner-logos/v4/box-light.svg"
            alt="imgCompanyHeader"
          />
          <img
            src="https://s.udemycdn.com/partner-logos/v4/netapp-light.svg"
            alt="imgCompanyHeader"
          />
          <img
            src="https://s.udemycdn.com/partner-logos/v4/eventbrite-light.svg"
            alt="imgCompanyHeader"
          />
        </div>
      </div>
      <div className="w-full  py-4  justify-between border-t-[0.8px] border-[#3e4143] grid md:grid-cols-3 gap-4">
        <div className="xxs:w-full flex xxs:flex-wrap md:flex-nowrap gap-4 md:col-span-2 xxs:order-2">
          <ul className=" flex flex-wrap gap-2 ">
            {renderListTitleFooter(leftButtomFooter)}
          </ul>
          <ul className=" flex flex-wrap gap-2 ">
            {renderListTitleFooter(centerButtomFooter)}
          </ul>
          <ul className=" flex flex-wrap gap-2 ">
            {renderListTitleFooter(rightButtomFooter)}
          </ul>
        </div>
        <div className="flex xxs:justify-start md:justify-end xxs:w-full xxs:order-1 md:order-2">
          <button
            className="h-[40px] font-[500] flex min-w-fit items-center flex-nowrap gap-2 
            text-white border-[0.8px] border-white px-4"
            onClick={() => {
              query.locale === "vi"
                ? navigate({ search: "" })
                : navigate({ search: "?locale=vi" });
              window.location.reload();
            }}
          >
            <TfiWorld />
            {query.locale === "vi" ? "English" : "Tiếng Việt"}
          </button>
        </div>
      </div>
      <div className="w-full flex justify-between items-center  pt-[64px] pb-[32px]">
        <img
          className="w-[92px] h-[34px]"
          src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg"
          alt=""
        />
        <div className="text-white ">© 2023 Udemy, Inc.</div>
      </div>
    </div>
  );
}

export default Footer;
