import axios from "axios";
import Cookies from "js-cookie";

const baseurl = "https://chat-back-production-53b7.up.railway.app/";
// const token = localStorage.getItem("accessToken");
const token = Cookies.get("accessToken");
const api = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-type": "application/json",
    accessToken: token,
  },
});

export default api;
