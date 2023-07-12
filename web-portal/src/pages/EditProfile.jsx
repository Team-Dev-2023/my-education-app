import React, { useEffect, useState } from "react";
import { useForm, useController } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-select";

import UploadImage from "components/UploadImage";
import { putProfile } from "utils/helpers/workWithApi";
import AlertSaveInfoProfileSuccess from "components/AlertSaveInfoProfileSuccess";
let countries = require("../asset/countries_v1.json");

function EditProfile() {
  const { userInfo } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");

  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState("");
  const [isSave, setIsSave] = useState(false);
  const [isAlertSaveInfoProfileSuccess, setIsAlertSaveInfoProfileSuccess] =
    useState(false);

  useEffect(() => {
    setProfile({ ...userInfo.data });
  }, [userInfo]);

  //FORM REACT HOOK
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(profile);
  }, [profile]);

  const {
    field: {
      value: countryValue,
      onChange: countryOnChange,
      ...restCountryField
    },
  } = useController({ name: "country", control });

  const onSubmit = (data) => {
    let dataProfile = {
      ...data,
      avatar: avatar,
    };

    putProfile(accessToken, dataProfile, setIsAlertSaveInfoProfileSuccess);
  };
  return (
    <div className="w-full  p-[48px] flex justify-center">
      <AlertSaveInfoProfileSuccess
        isAlertSaveInfoProfileSuccess={isAlertSaveInfoProfileSuccess}
        setIsAlertSaveInfoProfileSuccess={setIsAlertSaveInfoProfileSuccess}
      />
      <div className="w-full max-w-[1200px] flex flex-col gap-4 justify-center items-center">
        <h5 className="w-full flex justify-center font-[700] text-[40px] mt-4">
          Profile & settings
        </h5>
        <div className="w-full  max-w-[500px] mt-4">
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              onChange={() => {
                setIsSave(true);
              }}
              className="flex flex-col gap-2 w-full"
            >
              <label>Email</label>
              <input
                placeholder="Email"
                className="px-2 py-3 border-black border-[0.8px]  "
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
              {errors?.email?.type === "required" && (
                <p className="text-[#f00] ">Email is required</p>
              )}
              {errors?.email?.type === "pattern" && (
                <p className="text-[#f00] ">Invalid Email format.</p>
              )}

              <label>First Name</label>
              <input
                placeholder="First Name"
                className="px-2 py-3 border-black border-[0.8px]  "
                {...register("firstName", {
                  required: true,
                })}
              />
              {errors?.firstName?.type === "required" && (
                <p className="text-[#f00] ">First name is required</p>
              )}

              <label>Last Name</label>
              <input
                placeholder="Last Name"
                className="px-2 py-3 border-black border-[0.8px]  "
                {...register("lastName", {
                  required: true,
                })}
              />
              {errors?.lastName?.type === "required" && (
                <p className="text-[#f00] ">Last name is required</p>
              )}

              <label>Number phone</label>
              <input
                placeholder="Number phone"
                className="px-2 py-3 border-black border-[0.8px]  "
                {...register("phone", {
                  required: true,
                })}
              />
              {errors?.phone?.type === "required" && (
                <p className="text-[#f00] ">Last name is required</p>
              )}

              <div className="flex gap-3 flex-col">
                <label className="">Country</label>
                <Select
                  className="select-input"
                  placeholder="Select country"
                  isClearable
                  options={countries}
                  {...register("country", {
                    required: true,
                  })}
                  value={
                    countryValue
                      ? countries.find((x) => x.value === countryValue)
                      : countryValue
                  }
                  onChange={(option) => {
                    countryOnChange(option ? option.value : option);
                    setIsSave(true);
                  }}
                  {...restCountryField}
                />
                {errors?.country?.type === "required" && (
                  <p className="text-[#f00] ">Country is required</p>
                )}
              </div>

              <div>
                <p className="mb-2">Avatar</p>
                <UploadImage
                  avatar={profile.avatar}
                  setAvatar={setAvatar}
                  setIsSave={setIsSave}
                />
              </div>

              <button
                disabled={!isSave}
                className={`py-3 mt-2 h-[48px] ${
                  isSave ? "bg-[#a435f0]" : "bg-slate-400"
                } ${
                  isSave
                    ? "hover:cursor-pointer hover:bg-[#8710d8]"
                    : "hover:cursor-not-allowed"
                }  text-white font-[600]`}
                onClick={() => {
                  handleSubmit(onSubmit);
                }}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
