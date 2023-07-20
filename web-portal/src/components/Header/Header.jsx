import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import qs from "qs";

import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineBell,
} from "react-icons/ai";
import { Badge } from "antd";
import { TfiWorld } from "react-icons/tfi";

import logo from "../../asset/logo-udemy.png";
import Categories from "../Categories";
import { ROUTES } from "constants/routes";
import HorizontalMenuDropdown from "./HorizontalMenuDropdown";
import MenuProfile from "./MenuProfile";
import ListCartMini from "./ListCartMini";
import SearchOnTyping from "./SearchOnTyping";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartData } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const [countItemCart, setCountItemCart] = useState();

  useEffect(() => {
    setCountItemCart(cartData.data?.length);
  }, [cartData]);

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
          <SearchOnTyping />
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
          <div className="h-[100%] flex items-center">
            <div className="mx-2 w-auto hidden md:block">
              <AiOutlineHeart size={25} />
            </div>
            <div className="mx-2 h-full  items-center group relative w-auto hidden sm:flex hover:cursor-pointer">
              <Badge
                count={countItemCart}
                onClick={() => {
                  navigate(ROUTES.USER.CART);
                }}
              >
                <AiOutlineShoppingCart size={25} />
              </Badge>
              <div
                className="group-hover:!block hidden  w-[300px]
              group-hover:!opacity-100 !opacity-0 mt-[0.8px]
              transition duration-800 ease-in-out absolute top-[100%]
              right-[-100%]  bg-white z-10 "
              >
                <ListCartMini />
              </div>
            </div>

            <div className="mx-2 w-auto">
              <AiOutlineBell size={25} />
            </div>
            <div className="h-[100%] mx-2 group relative flex items-center justify-center">
              {userInfo?.data?.avatar ? (
                <img
                  className="w-[32px] "
                  src={userInfo.data.avatar}
                  alt="avatar"
                />
              ) : (
                <div className="w-[32px]  h-[32px] text-white flex items-center justify-center leading-[24px] text-[20px] font-bold  rounded-full bg-black hover:cursor-pointer ">
                  {userInfo?.data?.firstName?.charAt(0)}
                </div>
              )}
              <div
                className="group-hover:!block hidden 
              group-hover:!opacity-100 !opacity-0 mt-[0.8px]
              transition duration-800 ease-in-out absolute top-[100%]
              right-[0%]  bg-white z-10 "
              >
                <MenuProfile countItemCart={countItemCart} />
              </div>
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
