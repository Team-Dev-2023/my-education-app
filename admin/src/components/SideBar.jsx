import React from "react";
import { Menu } from "antd";
import { useEffect } from "react";
import parse from "url-parse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { useSelector } from "react-redux";
const SideBar = ({ showSideBar, setIsShowSideBar }) => {
  const [path, setPath] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

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

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(null, null, null, [getItem("Home", "0")], "group"),
    getItem(
      "Course",
      "Course",
      null,
      [getItem("List Course", "1"), getItem("Option 14", "14")],
      "group"
    ),
    getItem(
      "User",
      "User",
      null,
      userInfo.data.role === 0
        ? [getItem("List user", "2"), getItem("Create Account Admin", "3")]
        : [getItem("List user", "2")],
      "group"
    ),
    getItem(
      "Category",
      "Category",
      null,
      [
        getItem("Category", "4"),
        getItem("SubCategory", "5"),
        getItem("Topic", "6"),
      ],
      "group"
    ),
  ];
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
        items={items}
      />
    </div>
  );
};

export default SideBar;
