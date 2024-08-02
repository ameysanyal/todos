import React from 'react'
import { MdOutlineClose } from "react-icons/md"
import axios from 'axios'
import { useSnackbar } from 'notistack'
const Sure = ({ onData, onClose }) => {

    const { enqueueSnackbar } = useSnackbar();

    const sureDelete = () => {
        axios.delete('https://todos-backend-z4nv.onrender.com/todos').then((res) => {
            console.log(res.data.message)
            onData([]);
            enqueueSnackbar('Removed All todos Successfully', { variant: 'success' });
            onClose();
        }).catch((error) => {
            console.log(error)
            enqueueSnackbar('Error', { variant: 'error' });
        })
    }

    return (
        <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex flex-col justify-center items-center" onClick={onClose}>
            <div className="bg-purple-400 flex flex-col rounded-md p-4 relative w-64" onClick={(e) => { e.stopPropagation() }}>
                <h2 className='text-2xl m-2 text-center' >Are you Sure?</h2>
                <MdOutlineClose className='m-1 cursor-pointer absolute top-0 right-0' title="close" size={22} onClick={onClose} />
                <div className='flex flex-row justify-center items-center'>
                    <button className="bg-blue-500 text-white text-lg px-4 h-8 font-bold rounded-md m-4 hover:bg-blue-800" onClick={sureDelete}>Yes</button>
                    <button className="bg-red-500 text-white text-lg px-4 h-8 font-bold rounded-md m-4 hover:bg-red-800" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Sure
