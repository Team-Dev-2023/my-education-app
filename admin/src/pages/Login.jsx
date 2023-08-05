import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { loginAction, logoutAction } from "redux/actions";
import { getUserInfoAction } from "redux/actions";
import { ROUTES } from "constants/routes";

import { useGoogleLogin } from "@react-oauth/google";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as GoogleIcon } from "../asset/googleIcon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertAccountIncorrect from "components/AlertAccountIncorrect";

function LoginPage() {
  const eye = <FontAwesomeIcon icon={faEye} />;
  const { loginData } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");
  const [isAlertAccountIncorrect, setIsAlertAccountIncorrect] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

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

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(
      loginAction({
        data: { ...data },
        callback: (accessToken) => {
          dispatch(getUserInfoAction({ accessToken: accessToken }));
        },
      })
    );
  };

  useEffect(() => {
    if (accessToken && (userInfo.data.role === 2 || userInfo.data.role === 3)) {
      setIsAlertAccountIncorrect(true);
      dispatch(logoutAction());
    } else if (userInfo.data.role === 1 || userInfo.data.role === 0) {
      navigate(ROUTES.ADMIN.HOME_PAGE);
    }
  }, [userInfo.data]);
  return (
    <div className=" xxs:px-[24px] w-full flex h-[100vh]  justify-center items-center">
      <AlertAccountIncorrect
        isAlertAccountIncorrect={isAlertAccountIncorrect}
        setIsAlertAccountIncorrect={setIsAlertAccountIncorrect}
      />
      <div className="flex flex-col items-center  shadow-2xl p-4 xxs:w-full sm:w-[400px]  justify-center gap-2">
        <div>
          <img
            className="w-[100px]"
            src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
            alt=""
          />
        </div>
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
        <div
          className={`bg-[#dc46a3] w-full  font-[600] ${
            loginData.error !== "" ? " py-3 px-2" : ""
          }`}
        >
          {loginData.error}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <input
            placeholder="Username"
            className="px-2 py-3 border-black border-[0.8px]  "
            {...register("username", {
              required: true,
            })}
          />
          {errors?.username?.type === "required" && (
            <p className="text-[#f00] ">Username is required</p>
          )}
          {errors?.username?.type === "pattern" && (
            <p className="text-[#f00] ">Invalid User Name format.</p>
          )}

          <div className="px-2 py-3 border-black border-[0.8px] relative overflow-hidden ">
            <input
              {...register("password", {
                required: true,
              })}
              placeholder="Password"
              type={passwordShown ? "text" : "password"}
            />
            <i
              className="absolute right-4 top-[35%] hover:cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {eye}
            </i>
          </div>
          {errors?.password?.type === "required" && (
            <p className="text-[#f00] ">Password is required</p>
          )}
          <button
            className="py-3 mt-2 h-[48px] bg-[#a435f0] hover:bg-[#8710d8] text-white font-[600]"
            onClick={() => {
              handleSubmit(onSubmit);
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
