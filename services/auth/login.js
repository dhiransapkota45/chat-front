import axios from "axios";
import Cookies from "js-cookie";

const backendurl = "https://chat-back-production-53b7.up.railway.app";
export const login = async (data, router) => {
  try {
    const response = await axios.post(`${backendurl}/api/login`, data);
    console.log(response);
    // localStorage.setItem("accessToken", response.data.accessToken);
    Cookies.set("accessToken", response.data.accessToken);
    window.location.reload();
  } catch (error) {
    console.log("hello there", error);
  }
};
