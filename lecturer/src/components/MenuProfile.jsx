import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { TfiWorld } from "react-icons/tfi";

import { logoutAction } from "redux/actions";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
function MenuProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((store) => store.auth);
  console.log("userInfo", userInfo);

  return (
    <div className="min-w-[264px] border-[0.8px] shadow-md mt-[0.8px]">
      <div
        className="flex items-center gap-2 p-4 border-b-[0.8px]  hover:text-[#5624d0] cursor-pointer"
        onClick={() => {
          navigate(ROUTES.USER.HOME_PAGE);
        }}
      >
        {userInfo?.data?.avatar ? (
          <img className="w-[32px] " src="userInfo.data.avatar" alt="avatar" />
        ) : (
          <div className="w-[64px] h-[64px] text-white text-[30px] flex items-center justify-center leading-[24px] font-bold  rounded-full bg-black hover:cursor-pointer ">
            {userInfo?.data?.firstName?.charAt(0)}
          </div>
        )}
        <div className=" ">
          <div className="text-[20px] font-[700] mb-2">
            {userInfo?.data?.firstName}
          </div>
          <div
            className="text-[14px] 
          !text-black"
          >
            {userInfo?.data?.email}
          </div>
        </div>
      </div>
      <div className="flex flex-col  gap-4 p-4 border-b-[0.8px] ">
        <div
          className="hover:text-[#5624d0] cursor-pointer "
          onClick={() => {
            navigate(ROUTES.USER.HOME_PAGE);
          }}
        >
          My learning
        </div>
        <div
          className=" hover:text-[#5624d0] cursor-pointer flex justify-between items-center"
          onClick={() => {
            navigate(ROUTES.USER.HOME_PAGE);
          }}
        >
          <p>My cart</p>
          <p className="rounded-full flex justify-center items-center text-white font-[700] w-[25px] h-[25px] bg-[#a435f0]">
            2
          </p>
        </div>
        <div className="hover:text-[#5624d0] cursor-pointer ">Wishlist</div>
      </div>
      <div className="flex flex-col  gap-4 p-4 border-b-[0.8px] ">
        <div
          className="hover:text-[#5624d0] cursor-pointer  flex justify-between items-center"
          onClick={() => {
            navigate(ROUTES.USER.HOME_PAGE);
          }}
        >
          <p>Language</p>
          <p className=" flex gap-2 justify-center items-center ">
            English <TfiWorld />
          </p>
        </div>
        <div
          className="hover:text-[#5624d0] cursor-pointer "
          onClick={() => {
            navigate(ROUTES.USER.HOME_PAGE);
          }}
        >
          Edit profile
        </div>
      </div>
      <div className="hover:text-[#5624d0] cursor-pointer  flex  p-4 justify-center font-[700] ">
        <div
          onClick={() => {
            dispatch(logoutAction());
          }}
        >
          Log out
        </div>
      </div>
    </div>
  );
}

export default MenuProfile;
