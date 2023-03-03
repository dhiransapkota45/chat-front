import axios from "axios";

const baseurl = "http://localhost:8000";
const api = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-type": "application/json",
    accessToken: localStorage.getItem("accessToken"),
  },
});

export default api;
