import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

function NameLecturer() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.auth);

  return (
    <div>
      <h5 className="text-[20px]">Instructor profile(s):</h5>
      <div
        className="flex items-center gap-2 py-6 !pl-2
                   hover:text-[#5624d0] cursor-pointer"
        onClick={() => {
          navigate(ROUTES.LECTURE.HOME_PAGE);
        }}
      >
        {userInfo?.data?.avatar ? (
          <img className="w-[32px] " src="userInfo.data.avatar" alt="avatar" />
        ) : (
          <div
            className="w-[64px] h-[64px] !text-white text-[30px] flex items-center justify-center 
          leading-[24px] font-bold  rounded-full bg-black hover:cursor-pointer "
          >
            {userInfo?.data?.firstName?.charAt(0)}
          </div>
        )}
        <div className=" ">
          <div className="text-[20px] font-[700] mb-1">
            {userInfo?.data?.firstName}
          </div>
          <div className="text-[16px] font-[600] mb-2">
            {userInfo?.data?.email}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NameLecturer;
