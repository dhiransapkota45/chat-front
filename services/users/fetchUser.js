import api from "services/instance";

export const fetchuser = async () => {
  const response = await api.get("/api/fetchuser");
  return response.data.user;
};
