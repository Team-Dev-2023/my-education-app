import React from "react";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineBell,
} from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { Dropdown, Space } from "antd";

import logo from "../asset/logo-udemy.png";
import HorizontalMenuDropdown from "./HorizontalMenuDropdown";
import Categories from "./Categories";
import { ROUTES } from "constants/routes";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutAction } from "redux/actions";
import qs from "qs";

function Header() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const items = [
    {
      key: "1111",
      label: (
        <div
          target="_blank"
          onClick={() => {
            dispatch(logoutAction());
          }}
        >
          LOG OUT
        </div>
      ),
    },

    {
      key: "4444",
      danger: true,
      label: "a danger item",
    },
  ];

  return (
    <>
      <div className="container my-0 mx-auto flex justify-around place-items-center  h-24">
        <div
          className="w-24 mx-4 hover:cursor-pointer"
          onClick={() => {
            navigate(ROUTES.USER.HOME_PAGE);
          }}
        >
          <img src={logo} alt="logo" className="object-contain" />
        </div>
        <Categories className="mx-2 text-base" />
        <div className="flex-auto grid w-64 py-2 mx-2">
          <div className="inline-flex items-center rounded-full border-2 border-black">
            <AiOutlineSearch className="ml-1 opacity-80" />
            <input
              type="text"
              placeholder="Search for anything"
              className="pl-1 w-full rounded-full border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="mx-2 text-sm hidden lg:block">
          <a href="/" className="text-base">
            Become a Teacher
          </a>
        </div>
        <div className="mx-2 text-sm hidden lg:block">
          <a href="/" className="text-base">
            My Learning
          </a>
        </div>

        {!userInfo?.data?.uuid ? (
          <div className="flex gap-1">
            <div
              className="p-3 border-[0.8px] border-black font-[700] hover:cursor-pointer"
              onClick={() => {
                navigate(ROUTES.USER.LOGIN);
              }}
            >
              Log in
            </div>
            <div
              className="p-3 bg-black text-white font-[700] hover:cursor-pointer"
              onClick={() => {
                navigate(ROUTES.USER.REGISTER);
              }}
            >
              Sign up
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
          <div className="flex items-center">
            <div className="mx-2 w-auto hidden md:block">
              <AiOutlineHeart size={25} />
            </div>
            <div className="mx-2 w-auto hidden sm:block">
              <AiOutlineShoppingCart size={25} />
            </div>
            <div className="mx-2 w-auto">
              <AiOutlineBell size={25} />
            </div>
            <div className="mx-2  aspect-square h-1/3 flex items-center justify-center">
              {userInfo?.data?.avatar ? (
                <>
                  <img
                    className="w-[32px] "
                    src="userInfo.data.avatar"
                    alt="avatar"
                  />
                </>
              ) : (
                <div>
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <div className="w-[32px] h-[32px] text-white text-center leading-[24px] text-[20px] font-bold  rounded-full bg-black hover:cursor-pointer ">
                      {userInfo?.data?.firstName?.charAt(0)}
                    </div>
                  </Dropdown>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <hr className="my-0 border-gray-300 border-t-2" />
      <HorizontalMenuDropdown />
    </>
  );
}

export default Header;
