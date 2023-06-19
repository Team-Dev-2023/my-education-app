import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "redux/actions";

import ReactDOM from "react-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GoogleLogin } from "react-google-login";
import refreshTokenSetup from "utils/hook/refreshTokenSetup";
import FacebookLogin from "react-facebook-login";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

function LoginPage() {
  const dispatch = useDispatch();
  const clientIdGoogle =
    "714084172265-dppb057n3nq3tfjfaagcg1g6lcp7phef.apps.googleusercontent.com";
  //FORM REACT HOOK
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("asdsa");
    console.log(data);
    dispatch(
      loginAction({
        data: { ...data },
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
  //FACEBOOK
  // const responseFacebook = (response) => {
  //   console.log("success", response); // In thông tin đăng nhập Facebook của người dùng
  // };

  return (
    <div className="my-[200px] w-full flex  justify-center items-center">
      <div className="flex flex-col items-center w-[400px] justify-center gap-2">
        <GoogleLogin
          clientId={clientIdGoogle}
          onSuccess={onSuccessGoogle}
          onFailure={onFailureGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          buttonText="Continue with Google"
          className="w-full h-[48px] !text-[black]"
        />
        {/* <FacebookLogin
          appId="201240905777824" // Thay YOUR_APP_ID bằng ID ứng dụng của bạn
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
        /> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <input
            placeholder="Email"
            className="px-2 py-3 border-black border-[0.8px]  "
            {...register("email", {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="text-[#f00] ">Email is required</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className="text-[#f00] ">Invalid email format.</p>
          )}

          <div className="px-2 py-3 border-black border-[0.8px] relative ">
            <input
              {...register("password", {
                required: true,
              })}
              placeholder="Password"
              type={passwordShown ? "text" : "password"}
            />
            <i
              className="absolute right-4 top-[35%]"
              onClick={togglePasswordVisiblity}
            >
              {eye}
            </i>
          </div>
          {errors?.password?.type === "required" && (
            <p className="text-[#f00] ">Password is required</p>
          )}
          <button
            className="py-3 bg-[#a435f0] hover:bg-[#8710d8] text-white font-[600]"
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
