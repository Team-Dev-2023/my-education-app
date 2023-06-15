import React from "react";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineBell,
} from "react-icons/ai";
import logo from "../asset/logo-udemy.png";
import HorizontalMenuDropdown from "./HorizontalMenuDropdown";
import Categories from "./Categories";

function Header() {
  return (
    <>
      <div className="container my-0 mx-auto flex justify-around place-items-center  h-24">
        <div className="w-24 mx-4">
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
        <div className="mx-2 text-sm">
          <a href="/" className="text-base">
            Become a Teacher
          </a>
        </div>
        <div className="mx-2 text-sm">
          <a href="/" className="text-base">
            My Learning
          </a>
        </div>
        <div className="mx-2 w-auto">
          <AiOutlineHeart size={25} />
        </div>
        <div className="mx-2 w-auto">
          <AiOutlineShoppingCart size={25} />
        </div>
        <div className="mx-2 w-auto">
          <AiOutlineBell size={25} />
        </div>
        <div className="mx-2 rounded-full bg-fuchsia-900 aspect-square h-1/3 flex items-center justify-center">
          <div className="text-white font-bold">CC</div>
        </div>
      </div>
      <hr className="my-0 border-gray-300 border-t-2" />
      <HorizontalMenuDropdown />
    </>
  );
}

export default Header;
