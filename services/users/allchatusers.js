import api from "services/instance";

export const allchatusers = async () => {
  const res = await api.get("/api/allchat");
  console.log(res);
  return res;
};
