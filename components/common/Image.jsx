import React from 'react'

const Image = (image) => {
    return (
        <div>
            <img src={image} className="w-8 h-8 rounded-full" alt="" />
        </div>
    )
}

export default Image