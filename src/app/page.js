// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "./page.module.css";
// const inter = Inter({ subsets: ["latin"] });
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Main from "../../components/home/Main";
import { allchatusers } from "services/users/allchatusers";

export default function Home() {
  return (
    <div>
      <Main />
    </div>
  );
}
