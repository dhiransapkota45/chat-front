"use client";
import React, { useState } from "react";

import { login } from "../../../services/auth/login";
import { signup } from "services/auth/signup";
import { useForm } from "react-hook-form";
import { cloudinaryupload } from "utils/cloudinary";
const page = () => {
    const [loginorsignup, setLoginorsignup] = useState("login");
    const [profile, setProfile] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = async (data) => {
        if (loginorsignup === "login") {
            login();
        } else if (loginorsignup === "signup") {

            const func = async () => {
                const imageurl = await cloudinaryupload(profile)
                signup(data, imageurl);
            }
            func()
        }

    };
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
                        className={`${loginorsignup === "login" ? "bg-blue-600 text-white" : "bg-white"
                            } text-2xl px-6 py-2 rounded-3xl  font-bold`}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setLoginorsignup("signup")}
                        className={`${loginorsignup === "signup" ? "bg-blue-600 text-white" : "bg-white"
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
                        type="text"
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
                    className=" w-full bg-blue-600 p-2 text-white font-bold rounded-2xl"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default page;
