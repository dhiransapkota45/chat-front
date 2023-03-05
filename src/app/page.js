// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "./page.module.css";
// const inter = Inter({ subsets: ["latin"] });
"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Main from "../../components/home/Main";
import { allchatusers } from "services/users/allchatusers";
import { contexter } from "context/context";
import Cookies from "js-cookie";

export default function Home() {
  const route = useRouter();
  const { setChats } = useContext(contexter);
  // !localStorage.getItem("accessToken")
  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      route.push("/authenticate");
    } else {
      const func = async () => {
        const data = await allchatusers();
        setChats(data.data.allchatdetails);
      };
      func();
    }
  }, []);

  return (
    <div>
      <Main />
    </div>
  );
}
