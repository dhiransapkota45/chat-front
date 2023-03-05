import axios from "axios";

const backendurl = "http://localhost:8000";
export const login = async (data, router) => {
  try {
    const response = await axios.post(`${backendurl}/api/login`, data);
    console.log(response);
    localStorage.setItem("accessToken", response.data.accessToken);
    window.location.reload();
  } catch (error) {
    console.log("hello there", error);
  }
};
