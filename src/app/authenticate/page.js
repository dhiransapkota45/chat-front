"use client";
import React, { useEffect, useState } from "react";
import { login } from "../../../services/auth/login";
import { signup } from "services/auth/signup";
import { useForm } from "react-hook-form";
import { cloudinaryupload } from "utils/cloudinary";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const page = () => {
  const [loginorsignup, setLoginorsignup] = useState("login");
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    if (loginorsignup === "login") {
      setLoading(true);
      login(data, setLoading);
    } else if (loginorsignup === "signup") {
      setLoading(true);
      const func = async () => {
        const imageurl = await cloudinaryupload(profile);
        signup(data, imageurl, setLoading);
      };
      func();
    }
  };

  // localStorage.getItem("accessToken")

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      router.push("/");
    }
  }, []);
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className=" max-w-sm p-6 w-full text-blue-500 shadow-md border rounded-md flex flex-col gap-y-6"
      >
        <div className=" flex justify-center gap-2 border-2 my-6 w-fit mx-auto rounded-full ">
          <button
            type="button"
            onClick={() => setLoginorsignup("login")}
            className={`${
              loginorsignup === "login" ? "bg-blue-600 text-white" : "bg-white"
            } text-2xl px-6 py-2 rounded-3xl  font-bold`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setLoginorsignup("signup")}
            className={`${
              loginorsignup === "signup" ? "bg-blue-600 text-white" : "bg-white"
            } text-2xl px-6 py-2 rounded-3xl  font-bold`}
          >
            Signup
          </button>
        </div>

        <div className=" flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", { required: true })}
            name="username"
            className=" outline-none border w-full p-2 rounded-lg focus:border-blue-600"
            type="text"
            id="username"
            placeholder="username"
          />
          {errors.username && (
            <span className=" text-sm text-red-600">
              This field is required
            </span>
          )}
        </div>

        <div className=" flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: true })}
            name="password"
            type="password"
            placeholder="password"
            className=" outline-none border w-full p-2 rounded-lg focus:border-blue-600"
          />
          {errors.password && (
            <span className=" text-sm text-red-600">
              This field is required
            </span>
          )}
        </div>

        {loginorsignup === "signup" && (
          <div>
            <input
              onChange={(e) => setProfile(e.target.files[0])}
              name="file"
              type="file"
            />
          </div>
        )}

        <button
          type="submit"
          className={`w-full ${
            loading ? "bg-blue-500" : "bg-blue-600"
          } p-2 text-white font-bold rounded-2xl`}
        >
          {loading ? (
            <div className="w-full flex justify-center">
              <div className="spinner  "></div>
            </div>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default page;
