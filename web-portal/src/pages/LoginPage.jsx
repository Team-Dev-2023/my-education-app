import React, { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserInfoAction, loginAction } from "redux/actions";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import refreshTokenSetup from "utils/hook/refreshTokenSetup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { store } from "redux/store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
const eye = <FontAwesomeIcon icon={faEye} />;

function LoginPage() {
  const { loginData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleClientId =
    "714084172265-dppb057n3nq3tfjfaagcg1g6lcp7phef.apps.googleusercontent.com";
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
        callBack: (accessTokenLocal) => {
          navigate(ROUTES.USER.HOME_PAGE);
          dispatch(
            getUserInfoAction({
              accessTokenLocal: accessTokenLocal,
            })
          );
        },
      })
    );
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  //GOOGLE
  const onSuccessGoogle = (res) => {
    console.log("success", res);
    refreshTokenSetup(res);
  };
  const onFailureGoogle = (res) => {
    console.log("failure", res);
  };

  return (
    <div className="my-[100px] xxs:px-[24px] w-full flex  justify-center items-center">
      <div className="flex flex-col items-center xxs:w-full sm:w-[400px]  justify-center gap-2">
        <div className="w-full font-[600] py-3 text-[20px]">
          Log in to your Udemy account
        </div>
        <GoogleLogin
          clientId={googleClientId}
          onSuccess={onSuccessGoogle}
          onFailure={onFailureGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          buttonText="Continue with Google"
          className="w-full !h-[48px] !font-[600] !text-[black] !border-[black] 
          !shadow-none"
        />
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
            placeholder="User Name"
            className="px-2 py-3 border-black border-[0.8px]  "
            {...register("username", {
              required: true,
              // pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
          {errors?.username?.type === "required" && (
            <p className="text-[#f00] ">User Name is required</p>
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

export default LoginPage;
