import React from 'react'
import { MdOutlineClose } from "react-icons/md"
const Info = ({ todo, onClose }) => {
    return (
        <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex flex-col justify-center items-center" onClick={onClose}>
            <div className="bg-purple-400 flex flex-col rounded-md p-4 relative" onClick={(e) => { e.stopPropagation() }}>
                <MdOutlineClose className='m-1 cursor-pointer absolute top-0 right-0' title="close" size={22} onClick={onClose} />
                <p className='text-xl'>ID: {todo._id}</p>
                <p className='text-xl'>Todo: {todo.todo}</p>
                <p className='text-xl'>CreateAt: {new Date(todo.createdAt).toString()}</p>
                <p className='text-xl'>UpdatedAt: {new Date(todo.updatedAt).toString()}</p>
            </div>
        </div>
    )
}

export default Info
