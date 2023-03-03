import axios from "axios";

const backendurl = "http://localhost:8000";

export const signup = async (data, imageurl, router) => {
  try {
    const response = await axios.post(`${backendurl}/api/signup`, {
      ...data,
      image: imageurl,
    });

    console.log(response);
    localStorage.setItem("accessToken", response.data.accessToken);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
