import React from "react";
import { Menu } from "antd";
import { useEffect } from "react";
import parse from "url-parse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
const SideBar = () => {
  const [path, setPath] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const currentURL = window.location.href;
    const parsedURL = parse(currentURL);
    if (parsedURL.pathname === "/admin/list-course") {
      setPath(1);
    } else if (parsedURL.pathname === "/admin/list-account") {
      setPath(2);
    }
  }, []);

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
      [getItem("List user", "2"), getItem("Option 14", "15")],
      "group"
    ),
  ];
  const onClick = (e) => {
    console.log("click ", e);
    if (e.key === "1") {
      navigate(ROUTES.ADMIN.LIST_COURSE);
    } else if (e.key === "2") {
      navigate(ROUTES.ADMIN.LIST_ACCOUNT);
    }
  };
  return (
    <div>
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
