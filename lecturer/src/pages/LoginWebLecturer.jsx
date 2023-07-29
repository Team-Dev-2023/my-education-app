import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoAction, loginAction, logoutAction } from "redux/actions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useGoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as GoogleIcon } from "../asset/googleIcon.svg";
import { ROUTES } from "constants/routes";
import AlertAccountIncorrect from "components/AlertAccountIncorrect";

function LoginWebLecturer() {
  const eye = <FontAwesomeIcon icon={faEye} />;
  const { loginData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [isAlertAccountIncorrect, setIsAlertAccountIncorrect] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  //FORM REACT HOOK
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(
      loginAction({
        data: { ...data },
        callBack: (accessToken) => {
          dispatch(
            getUserInfoAction({
              accessToken: accessToken,
            })
          );
        },
      })
    );
  };
  useEffect(() => {
    if (accessToken && userInfo.data.role !== 2) {
      dispatch(logoutAction());
      setIsAlertAccountIncorrect(true);
    } else if (userInfo.data.role === 2) {
      navigate(ROUTES.LECTURE.HOME_PAGE);
    }
  }, [userInfo.data]);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  //GOOGLE
  const login = useGoogleLogin({
    onSuccess: (event) => {
      localStorage.setItem("accessToken", event.access_token);
      console.log("Login success");
      navigate(ROUTES.USER.HOME_PAGE);
    },
    onError: (event) => console.log("Login fail.", event),
  });
  return (
    <div className="my-[100px] xxs:px-[24px] w-full flex  justify-center items-center">
      <AlertAccountIncorrect
        isAlertAccountIncorrect={isAlertAccountIncorrect}
        setIsAlertAccountIncorrect={setIsAlertAccountIncorrect}
      />
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
              // pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
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
              onClick={togglePasswordVisiblity}
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

export default LoginWebLecturer;
