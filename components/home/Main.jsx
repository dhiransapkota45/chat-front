import React, { useEffect, useState } from 'react'
import MessageBox from './interior/MessageBox'
import Sidebar from './interior/Sidebar'

import { io } from 'socket.io-client'

const baseurl = "http://localhost:8000"
let socket;
const Main = () => {
  const [socketState, setSocketState] = useState(null)

  useEffect(() => {
    socket = io(baseurl)
    setSocketState(socket)
  }, [])
  return (
    <div className=' grid grid-cols-12 h-screen'>
      <div className=' col-span-3 bg-green-400'>
        <Sidebar socket={socketState && socketState} />
      </div>
      <div className=' col-span-9 bg-green-500'>
        <MessageBox socket={socketState && socketState} />
      </div>
    </div>
  )
}

export default Main