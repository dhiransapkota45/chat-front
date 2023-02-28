'use client';
import React, { useState } from 'react'

const page = () => {
    const [loginorsignup, setLoginorsignup] = useState("login")
    return (
        <div className=' w-full h-screen flex justify-center items-center'>
            <div className=' max-w-sm p-6 w-full text-blue-500 shadow-md border rounded-md flex flex-col gap-y-6'>

                <div className=' flex justify-center gap-2 border-2 my-6 w-fit mx-auto rounded-full '>
                    <button onClick={() => setLoginorsignup("login")} className={`${loginorsignup === "login" ? "bg-blue-600 text-white" : "bg-white"} text-2xl px-6 py-2 rounded-3xl  font-bold`}>Login</button>
                    <button onClick={() => setLoginorsignup("signup")} className={`${loginorsignup === "signup" ? "bg-blue-600 text-white" : "bg-white"} text-2xl px-6 py-2 rounded-3xl  font-bold`}>Signup</button>

                </div>


                <div className=' flex flex-col gap-2'>
                    <label htmlFor="username">Username</label>
                    <input className=' outline-none border w-full p-2 rounded-lg focus:border-blue-600' type="text" id='username' placeholder='username' />
                </div>

                <div className=' flex flex-col gap-2'>
                    <label htmlFor="password">Password</label>
                    <input type="text" placeholder='password' className=' outline-none border w-full p-2 rounded-lg focus:border-blue-600' />
                </div>
            </div>
        </div>
    )
}

export default page