import Image from 'components/common/Image'
import { contexter } from 'context/context'
import React, { useContext, useEffect, useState } from 'react'
import api from 'services/instance'
import { createMessage } from 'services/messages/createMessage'

const MessageBox = ({ socket }) => {
    const { activechat, mainuser, chats, selectedChat } = useContext(contexter)
    // console.log(selectedChat)
    const [allchatdata, setAllchatdata] = useState([])

    const [faskestate, setFakestate] = useState(false)

    const [chatboxdata, setChatboxdata] = useState("")

    const onsendHandler = async (e) => {
        e.preventDefault()

        const response = await createMessage(activechat, chatboxdata)
        // console.log(response.data.createdmessage);

        socket.emit("new message", response.data.createdmessage)
        setFakestate(!faskestate)
    }

    // useEffect(() => {
    //     console.log("it has run");

    // }, [faskestate])

    // socket && socket.on("random", (data) => {
    //     console.log(data);
    // })

    socket && socket.on("message received", (newMessage) => {
        console.log(newMessage);
        if (activechat === newMessage.chat._id) {
            console.log("hurray");
            setAllchatdata([...allchatdata, newMessage])
        } else {
            //do something here
        }
    })



    useEffect(() => {
        const func = async () => {
            const response = await api.get(`/api/createmessage/${activechat}`)
            // console.log(response);
            setAllchatdata(response.data.allmessagesOfChat)
        }
        func()
    }, [activechat])
    return (
        activechat &&
        <div className=' py-9 px-6 flex flex-col-reverse justify-start h-screen'>
            <form onSubmit={onsendHandler} className='flex'>
                <input value={chatboxdata} onChange={(e) => setChatboxdata(e.target.value)} name='chatbox' className=' grow p-2  rounded-lg' type="text" placeholder='enter your message' />
                <button type='submit'>send</button>
            </form>

            <div className=''>
                {
                    allchatdata.map((data, index) => {
                        return (
                            <div key={index} className={` my-3 flex items-center gap-3 text-white font-semibold ${mainuser._id === data.sender._id ? "justify-end" : "justify-start"} `}>
                                <div>{data.content}</div>
                                <div><img className=' w-8 h-8 rounded-full' src={data.sender.image} alt="" /></div>
                            </div>
                        )
                    })
                }
            </div>


            <div className=' '>
                {
                    mainuser ?
                        <>
                            {/* <Image image={mainuser.image} /> */}
                            <div>
                                <img src={selectedChat.image} className="w-8 h-8 rounded-full" alt="" />
                            </div>
                            <div>{selectedChat.username}</div>
                        </>
                        :
                        <div>
                            loading...
                        </div>
                }
                {/* <div className='hidden'>hello</div> */}

            </div>
        </div>
    )
}

export default MessageBox