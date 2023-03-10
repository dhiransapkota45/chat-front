import Image from 'components/common/Image'
import Message from 'components/common/Message'
import { contexter } from 'context/context'
import React, { useContext, useEffect, useState } from 'react'
import api from 'services/instance'
import { createMessage } from 'services/messages/createMessage'
import { BsFillSendFill } from "react-icons/bs"

const MessageBox = ({ socket }) => {
    const { activechat, mainuser, chats, selectedChat } = useContext(contexter)

    const [allchatdata, setAllchatdata] = useState([])

    const [chatboxdata, setChatboxdata] = useState("")

    const onsendHandler = async (e) => {
        e.preventDefault()
        const response = await createMessage(activechat, chatboxdata)
        socket.emit("new message", response.data.createdmessage)
        setChatboxdata("")
    }

    socket && socket.on("message received", (newMessage) => {
        console.log(newMessage);
        if (activechat === newMessage.chat._id) {
            setAllchatdata([newMessage, ...allchatdata])
        } else {
            //do something here
        }
    })


    useEffect(() => {
        const func = async () => {
            const response = await api.get(`/api/createmessage/${activechat}`)
            setAllchatdata(response.data.allmessagesOfChat)
        }
        func()
    }, [activechat])
    return (
        activechat &&
        <div className=' flex flex-col h-full justify-start '>

            <div className=' p-4 flex items-center gap-3 text-white font-shantell font-medium border-gray-700 border-b-2 '>
                <div>
                    <img src={selectedChat.image} className="w-12 h-12 rounded-full object-cover" alt="" />
                </div>
                <div className=' text-xl capitalize'>{selectedChat.username}</div>
            </div>

            <div className=' flex-grow flex flex-col-reverse h-96 overflow-y-auto no-scrollbar px-6 '>
                {
                    allchatdata.length > 0 ?
                        allchatdata.map((data, index) => {
                            return (
                                <div key={data._id} className={` my-3 flex items-center gap-3 text-white font-semibold ${mainuser._id === data.sender._id ? "justify-end" : "justify-start"} `}>
                                    <div className={`${mainuser._id === data.sender._id ? "hidden" : ""}`}><img className=' w-8 h-8 rounded-full' src={data.sender.image} alt="" /></div>
                                    <div>
                                        <Message text={data.content} />
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className='text-white h-full flex items-center justify-center font-semibold text-2xl'>Start Chatting</div>
                }
            </div>



            <form onSubmit={onsendHandler} className='flex px-8 py-4'>
                <input value={chatboxdata} onChange={(e) => setChatboxdata(e.target.value)} name='chatbox' className=' grow p-2 outline-none bg-gray-600 pl-6 text-white  rounded-3xl' type="text" placeholder='enter your message' />
                <button className=' text-white p-2
                ' type='submit'><BsFillSendFill /></button>
            </form>
        </div>
    )
}

export default MessageBox