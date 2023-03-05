import axios from "axios";

const baseurl = "https://chat-back-production-53b7.up.railway.app/";
const token = localStorage.getItem("accessToken");
const api = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-type": "application/json",
    accessToken: token,
  },
});

export default api;
