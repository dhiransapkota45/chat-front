import { createContext, useEffect, useState } from "react";
import { allchatusers } from "services/users/allchatusers";
import { fetchuser } from "services/users/fetchUser";
import { useRouter } from "next/navigation";
export const contexter = createContext();

const ContextFunc = (props) => {
  const [chats, setChats] = useState([]);
  const [mainuser, setMainuser] = useState(null);
  const [activechat, setActivechat] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const route = useRouter();

  useEffect(() => {
    const func = async () => {
      const data = await fetchuser();
      setMainuser(data);
    };
    func();
  }, []);

  return (
    <contexter.Provider
      value={{
        chats,
        setChats,
        mainuser,
        activechat,
        setActivechat,
        selectedChat,
        setSelectedChat,
      }}
    >
      {props.children}
    </contexter.Provider>
  );
};

export default ContextFunc;
