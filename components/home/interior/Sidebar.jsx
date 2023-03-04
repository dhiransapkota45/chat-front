import React, { useState } from 'react'
import { useContext } from "react"
import api from 'services/instance'
import { allchatusers } from 'services/users/allchatusers'
import { contexter } from "../../../context/context"


const Sidebar = ({ socket }) => {
    const { chats, mainuser, setActivechat, setChats, setSelectedChat } = useContext(contexter)
    const [inputUser, setInputUser] = useState("")
    const [searchedUsers, setSearchedUsers] = useState([])
    const chatClickHandler = (chatid, user) => {
        console.log(chatid);
        setActivechat(chatid)

        // console.log(user);
        setSelectedChat(user)
        socket.emit("join chat", chatid)
    }

    const onchageChatHandler = async (e) => {
        setInputUser(e.target.value)
        const response = await api.get(`/api/allusers?search=${e.target.value}`)
        console.log(response.data.users)
        setSearchedUsers(response.data.users)
    }

    const createChatHandler = async (userid) => {
        const response = await api.post("/api/createchat", { userid })
        console.log(response);
        setInputUser("")

        const func = async () => {
            const data = await allchatusers();
            setChats(data.data.allchatdetails);
            setActivechat(response.data.fullchat._id)
        };
        func();

    }

    return (
        <div className=' px-4 pt-5'>
            <div className=' flex justify-between items-center'>
                <div className=' font-bold text-4xl'>Chat</div>
                <div>Create Room</div>
            </div>

            <div className=' my-4'>
                <div className=' relative'>
                    <input onChange={onchageChatHandler} value={inputUser} name="chatsearch" type="text" className=' w-full p-1 rounded-full pl-3' placeholder='search user' />
                    {(inputUser && searchedUsers.length !== 0) &&
                        <div className=' absolute bg-white w-full p-2'>
                            {
                                searchedUsers && searchedUsers.map((user) => {
                                    return (
                                        <button onClick={() => createChatHandler(user._id)} key={user._id} className="w-full my-1 px-3 py-2 bg-black bg-opacity-20 rounded-md flex justify-between items-center">
                                            <div><img src={user.image} className="w-8 h-8 rounded-full" alt="" /></div>
                                            <div>{user.username}</div>
                                        </button>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>

            <div className=' h-[1px] bg-green-200 w-full my-4'></div>


            <div>
                {chats.map((chat, index) => {
                    return (
                        <div key={index}>
                            {
                                chat.users.map((user, index) => {
                                    if (user._id !== mainuser._id) {
                                        return (
                                            <button key={index} type='button' onClick={() => chatClickHandler(chat._id, user)} className=' bg-green-600 hover:cursor-pointer text-white p-2 rounded-md flex w-full my-4 gap-2 items-center'>
                                                <img src={user.image} alt="profile" className=' w-12 h-12 rounded-full' />
                                                <p className=' capitalize'>{user.username}</p>
                                            </button>
                                        )
                                    }
                                })
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar