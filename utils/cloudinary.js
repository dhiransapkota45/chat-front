import axios from "axios";

export const cloudinaryupload = async (profile) => {
  console.log("cloud run ");
  const formData = new FormData();
  formData.append("file", profile);
  formData.append("upload_preset", "dhiran-image");

  const data = await axios.post(
    "https://api.cloudinary.com/v1_1/dqjdhir4k/image/upload",
    formData
  );
  return data.data.secure_url;
};
