import React from "react";
import { TfiWorld } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "redux/actions";

const MenuProfileAdmin = () => {
  const { userInfo } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  return (
    <div className="min-w-[264px] border-[0.8px] shadow-md mt-[0.8px]">
      <div className="flex items-center gap-2 p-4 border-b-[0.8px]  hover:text-[#5624d0] cursor-pointer">
        {userInfo?.data?.avatar ? (
          <img className="w-[32px] " src={userInfo.data.avatar} alt="avatar" />
        ) : (
          <div className="w-[64px] h-[64px] text-white flex items-center justify-center leading-[24px] text-[30px] font-bold  rounded-full bg-black hover:cursor-pointer ">
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
        <div className="hover:text-[#5624d0] cursor-pointer ">My learning</div>
        <div className="hover:text-[#5624d0] cursor-pointer ">Wishlist</div>
      </div>
      <div className="flex flex-col  gap-4 p-4 border-b-[0.8px] ">
        <div className="hover:text-[#5624d0] cursor-pointer  flex justify-between items-center">
          <p>Language</p>
          <p className=" flex gap-2 justify-center items-center ">
            English <TfiWorld />
          </p>
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
};

export default MenuProfileAdmin;
