import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { loginAction } from "redux/actions";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { getUserInfoAction } from "redux/actions";

import { ReactComponent as GoogleIcon } from "../asset/googleIcon.svg";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (event) => {
      localStorage.setItem("accessToken", event.access_token);
      console.log("Login success");
      navigate(ROUTES.ADMIN.HOME_PAGE);
    },
    onError: (event) => console.log("Login fail.", event),
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();
  const onSubmit = (data) => {
    try {
      dispatch(
        loginAction({
          data: { ...data },
          callback: (accessToken) => {
            navigate(ROUTES.ADMIN.HOME_PAGE);
            dispatch(getUserInfoAction({ accessToken: accessToken }));
          },
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-[100px] xxs:px-[24px] w-full flex  justify-center items-center">
      <div className="flex flex-col items-center xxs:w-full sm:w-[400px]  justify-center gap-2">
        <div className="w-full font-[600] py-3 text-[20px]">
          Log in to your Udemy account
        </div>
        <button
          className="w-full !h-[48px] !font-[600] !text-[black] border !border-[black] 
          !shadow-none flex items-center justify-center"
          onClick={login}
        >
          <GoogleIcon className="w-10 inline-block" />
          Continue with google
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <input
            placeholder="User Name"
            {...register("username", { required: true })}
            className="px-2 py-3 border-black border-[0.8px]"
          />
          <div className="px-2 py-3 border-black border-[0.8px] relative overflow-hidden ">
            <input
              placeholder="Password"
              {...register("password", { required: true })}
              type={passwordShown ? "text" : "password"}
            />
            <i
              className="absolute right-4 top-[35%] hover:cursor-pointer"
              onClick={togglePasswordVisiblity}
            >
              <FontAwesomeIcon icon={faEye} />
            </i>
          </div>
          <button
            className="py-3 mt-2 h-[48px] bg-[#a435f0] hover:bg-[#8710d8] text-white font-[600]"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
