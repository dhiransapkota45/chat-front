import axios from "axios";
import Cookies from "js-cookie";
import { errorToast } from "utils/errorToast";

const backendurl = "https://chat-back-production-53b7.up.railway.app";
export const login = async (data, setLoading) => {
  try {
    const response = await axios.post(`${backendurl}/api/login`, data);
    console.log(response);
    // localStorage.setItem("accessToken", response.data.accessToken);
    Cookies.set("accessToken", response.data.accessToken);
    window.location.reload();
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log("hello there", error.response.data.msg);
    errorToast(error.response.data.msg ? error.response.data.msg : "error");
  }
};
