import axios from "axios";
import Cookies from "js-cookie";

const backendurl = "https://chat-back-production-53b7.up.railway.app";

export const signup = async (data, imageurl, setLoading) => {
  try {
    const response = await axios.post(`${backendurl}/api/signup`, {
      ...data,
      image: imageurl,
    });

    console.log(response);
    // localStorage.setItem("accessToken", response.data.accessToken);
    Cookies.set("accessToken", response.data.accessToken);
    // router.push("/");
    window.location.reload();
    setLoading(false);
    console.log("it should never run");
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
