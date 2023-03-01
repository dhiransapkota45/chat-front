// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "./page.module.css";
// const inter = Inter({ subsets: ["latin"] });
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      route.push("/authenticate");
    }
  }, []);
  return <div className=" grid grid-c">okay</div>;
}
