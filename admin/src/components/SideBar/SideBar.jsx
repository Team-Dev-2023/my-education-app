import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import parse from "url-parse";
import { Menu } from "antd";
import { ROUTES } from "constants/routes";
import { itemMenus } from "./itemsMenu";

const SideBar = ({ showSideBar, setIsShowSideBar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [path, setPath] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentURL = window.location.href;
    const parsedURL = parse(currentURL);
    if (parsedURL.pathname === "/admin/list-course") {
      setPath(1);
    } else if (parsedURL.pathname === "/admin/list-account") {
      setPath(2);
    } else if (parsedURL.pathname === "/admin") {
      setPath(0);
    }
  });

  const onClick = (e) => {
    setIsShowSideBar(!showSideBar);
    if (e.key === "1") {
      navigate(ROUTES.ADMIN.LIST_COURSE);
    } else if (e.key === "2") {
      navigate(ROUTES.ADMIN.LIST_ACCOUNT);
    } else if (e.key === "0") {
      navigate(ROUTES.ADMIN.HOME_PAGE);
    }
  };
  return (
    <div>
      <div
        className="w-full border-menu justify-end bg-white p-4 xxs:flex md:hidden"
        onClick={() => {
          setIsShowSideBar(!showSideBar);
        }}
      >
        <img
          src="https://bizweb.dktcdn.net/100/438/408/themes/916476/assets/closemenu.svg?1691226747108"
          alt=""
        />
      </div>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
          minHeight: "100vh",
        }}
        selectedKeys={path.toString()}
        mode="inline"
        items={itemMenus(userInfo)}
      />
    </div>
  );
};

export default SideBar;
