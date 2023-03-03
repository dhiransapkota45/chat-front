import api from "services/instance";

export const createMessage = async (chatid, content) => {
  const message = {
    chat: chatid,
    content,
  };
  const response = await api.post("/api/createmessage", message);
  console.log(response);
  return response;
};
