import React from "react";
import { useSelector } from "react-redux";
import MenuProfileAdmin from "./MenuProfileAdmin";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { TfiWorld } from "react-icons/tfi";
import qs from "qs";
import { AiOutlineSearch } from "react-icons/ai";
import { Drawer } from "antd";
import { useState } from "react";

const Header = ({ isShowSideBar, setIsShowSideBar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { search } = useLocation();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const query = qs.parse(search, { ignoreQueryPrefix: true });

  return (
    <div className="flex justify-between items-center px-4 py-3 shadow-xl">
      <div className="flex gap-4">
        <div
          className="w-[40px] xxs:block md:hidden"
          onClick={() => setIsShowSideBar(!isShowSideBar)}
        >
          <img
            src="https://bizweb.dktcdn.net/100/438/408/themes/916476/assets/menu.jpg?1691226747108"
            alt=""
          />
        </div>
        <img
          className="w-[100px]"
          src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
          alt=""
        />
      </div>
      <div>
        <div className="relative  flex-col items-start xxs:hidden md:flex">
          <div className="inline-flex max-w-full w-[400px]  p-1 items-center rounded-full border-2 border-[#666163]">
            <AiOutlineSearch className="ml-1 opacity-80 text-[30px]" />
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                placeholder="Search for anything"
                className="pl-1 w-full rounded-full border-none focus:outline-none"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="xxs:show md:hidden">
          <div className="w-[40px]" onClick={showDrawer}>
            <img
              src="https://bizweb.dktcdn.net/100/438/408/themes/916476/assets/search_icon.jpg?1691226747108"
              alt=""
            />
          </div>
          <Drawer
            title="Basic Drawer"
            placement="right"
            onClose={onClose}
            open={open}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </div>
        {!userInfo.data ? (
          <div className="flex">
            <div
              className="p-3 border-[0.8px] border-black font-[700] hover:cursor-pointer"
              onClick={() => {
                navigate(ROUTES.ADMIN.LOGIN);
              }}
            >
              Log in
            </div>
            <div
              className="p-3 border-[0.8px] border-black"
              onClick={() => {
                query.locale === "vi"
                  ? navigate({ search: "" })
                  : navigate({ search: "?locale=vi" });
                window.location.reload();
              }}
            >
              <TfiWorld />
            </div>
          </div>
        ) : (
          <div className="h-[100%] mx-2 group relative flex items-center justify-center">
            {userInfo?.data?.avatar ? (
              <img
                className="w-[32px] "
                src={userInfo.data.avatar}
                alt="avatar"
              />
            ) : (
              <div
                className="w-[32px]  h-[32px] text-white flex items-center justify-center
                       leading-[24px] text-[20px] font-bold 
                     rounded-full bg-black hover:cursor-pointer "
              >
                {userInfo?.data?.firstName?.charAt(0)}
              </div>
            )}
            <div
              className="group-hover:!block hidden 
              group-hover:!opacity-100 !opacity-0 mt-[0.8px]
              transition duration-800 ease-in-out absolute top-[100%]
              right-[0%]  bg-white z-10 "
            >
              <MenuProfileAdmin />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
