import React, { useEffect, useState } from 'react'
import MessageBox from './interior/MessageBox'
import Sidebar from './interior/Sidebar'
import { contexter } from 'context/context'
import { useContext } from "react"
import { io } from 'socket.io-client'

import { useRouter } from 'next/navigation'

const baseurl = "https://chat-back-production-53b7.up.railway.app/"
let socket;
const Main = () => {
  const [socketState, setSocketState] = useState(null)
  const { mainuser } = useContext(contexter)
  const [modal, setModel] = useState(false)
  const route = useRouter()

  const logoutHandler = () => {
    localStorage.removeItem("accessToken")
    route.push("/authenticate")
  }
  useEffect(() => {
    socket = io(baseurl)
    setSocketState(socket)
  }, [])
  return (
    <div className='h-screen overflow-hidden flex flex-col'>
      <div className='bg-gray-800 relative p-6 flex justify-center items-center gap-7'>
        <div className=' text-white font-shantell font-bold text-3xl'>Chat Room</div>
        <div onClick={() => setModel((prev) => !prev)} className='absolute cursor-pointer right-5 rounded-full'><img className=' w-12 h-12 object-cover border-2 border-white rounded-full' src={mainuser?.image} alt="" />
          {
            modal && <div className=' absolute flex flex-col gap-y-3 items-center w-40 bg-gray-700 top-14 right-3 p-4 text-white '>
              <div className=''>Hi, <span className='capitalize'>{mainuser.username}</span></div>

              <div className=' w-full rounded-md bg-gray-500 p-1 text-center' onClick={logoutHandler} >Logout</div>

            </div>
          }
        </div>
      </div>
      <div className=' w-full h-full grid grid-cols-12 '>
        <div className='  bg-gray-800 col-span-3'>
          <Sidebar socket={socketState && socketState} />
        </div>
        <div className='  bg-gray-900 w-full h-full col-span-9'>
          <MessageBox socket={socketState && socketState} />
        </div>
      </div>
    </div>
  )
}

export default Main