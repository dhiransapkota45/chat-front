import axios from "axios";

const baseurl = "https://chat-back-production-53b7.up.railway.app/";
const api = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-type": "application/json",
    accessToken: localStorage.getItem("accessToken"),
  },
});

export default api;
