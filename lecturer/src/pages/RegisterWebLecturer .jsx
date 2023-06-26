import React, { useState } from "react";
import { Select, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfoAction, registerAction } from "redux/actions";
import { ROUTES } from "constants/routes";
let countries = require("../asset/countries_v1.json");

function RegisterWebLecturer() {
  const [formData, setFormData] = useState({
    password: "",
    username: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "VN",
    role: 2,
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { target } = event;
    if (target.name === "email") {
      setFormData((prevFormData) => ({ ...prevFormData, email: target.value }));
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(target.value);
      setEmailError(!isValidEmail);
    } else if (target.name === "password") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        password: target.value,
      }));
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      const isPasswordValid = passwordPattern.test(target.value);
      setPasswordError(!isPasswordValid);
    } else if (target.name === "phone") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        phone: target.value,
      }));
      const phonePattern = /^\d{10}$/;
      const isValidPhone = phonePattern.test(target.value);
      setPhoneError(!isValidPhone);
    } else {
      const { name, value } = target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };
  const handleCountryChange = (value) => {
    setFormData((prevFormData) => ({ ...prevFormData, country: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerAction({
        data: { ...formData },
        callback: (accessToken) => {
          dispatch(getUserInfoAction({ accessToken: accessToken }));
          navigate(ROUTES.LECTURE.HOME_PAGE);
        },
      })
    );
    setFormData({
      ...formData,
      password: "",
      username: "",
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      country: "",
    });

    navigate(ROUTES.LECTURE.HOME_PAGE);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center py-9">
        <div className="container w-[352px]">
          <h2 className="mb-7 text-[1rem] leading-[1.2rem] font-bold">
            Sign up and start teaching
          </h2>
        </div>
        <form onSubmit={onSubmit} className="w-[352px] flex flex-col">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
            className="border border-black py-4 px-[1.6rem] mb-3"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            className="border border-black py-4 px-[1.6rem] mb-3"
          />
          {passwordError && (
            <p className="mb-3 leading-5 text-[#f00]">
              Please enter a valid password containning at least one number and
              one letter.
            </p>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="border border-black py-4 px-[1.6rem] mb-3"
          />
          {emailError && (
            <p className="mb-3 leading-5 text-[#f00]">
              Please enter a valid email address.
            </p>
          )}
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            required
            className="border border-black py-4 px-[1.6rem] mb-3"
          />
          {phoneError && (
            <p className="mb-3 leading-5 text-[#f00]">
              Please enter a valid phone number.
            </p>
          )}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First name"
            required
            className="border border-black py-4 px-[1.6rem] mb-3"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last name"
            required
            className="border border-black py-4 px-[1.6rem] mb-3"
          />
          <Space wrap className="border border-black py-4 px-[1.6rem] mb-3">
            <Select
              defaultValue={"VN"}
              onChange={handleCountryChange}
              name="country"
              options={countries}
              style={{
                width: 300,
              }}
              required
            />
          </Space>
          <button
            type="submit"
            className="bg-[#a435f0] hover:bg-[#8710d8] disabled:bg-slate-500 text-[1rem] font-bold text-white h-[48px]"
            disabled={passwordError || phoneError || emailError}
          >
            Sign up
          </button>
        </form>
        <div className="container w-[352px]">
          <p className="mt-7 text-[12px] text-center">
            By signing up, you agree to our Terms of Use and Privacy Policy.
          </p>
        </div>
        <div className="border-t-[1px] border-gray-600 my-7 w-[352px]"></div>
        <p className="text-[15px]">Already have an account? Log in</p>
      </div>
    </div>
  );
}

export default RegisterWebLecturer;
