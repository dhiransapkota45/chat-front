import React from 'react'

const Message = ({ text }) => {
    return (
        <div className=' bg-blue-500 text-white font-medium font-shantell rounded-3xl px-4 py-2'>
            {text}
        </div>
    )
}

export default Message