import React, { use } from 'react'
import { useContext } from "react"
import { contexter } from "../../../context/context"


const Sidebar = ({ socket }) => {
    const { chats, mainuser, setActivechat } = useContext(contexter)

    const chatClickHandler = (chatid) => {
        console.log(chatid);
        setActivechat(chatid)
        socket.emit("join chat", chatid)
    }
    return (
        <div className=' px-4 pt-5'>
            <div className=' flex justify-between items-center'>
                <div className=' font-bold text-4xl'>Chat</div>
                <div>Create Room</div>
            </div>

            <div className=' my-4'>
                <input type="text" className=' w-full p-1 rounded-full pl-3' placeholder='search user' />
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
                                            <button key={index} type='button' onClick={() => chatClickHandler(chat._id)} className=' bg-green-600 hover:cursor-pointer text-white p-2 rounded-md flex w-full my-4 gap-2 items-center'>
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