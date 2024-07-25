import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Info from './Info'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { MdSave } from "react-icons/md";

const Display = (props) => {
    const [displaytodo, setDisplayTodo] = useState(props.display)
    const [showInfo, setShowInfo] = useState(false)
    const [info, setInfo] = useState({})
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    const infoTodo = (infoIndex) => {

        const id = displaytodo[infoIndex]._id
        console.log(`infotodo ${id}`)
        axios.get(`http://localhost:2000/todos/${id}`).then(
            (res) => {
                console.log(`in one get ${res.data.todo}`)
                setShowInfo(true)
                setInfo(res.data)
            }
        ).catch((error) => {
            console.log(`todo not deleted ${error}`)
        })

    }

    const editTodo = (index) => {
        setEditIndex(index);
        setEditValue(displaytodo[index].todo);

    };

    const saveTodo = (updateIndex) => {

        const id = displaytodo[updateIndex]._id
        console.log(`id:${id}`)
        axios.put(`http://localhost:2000/todos/${id}`, { todo: editValue }).then(
            () => {

                const updatedTodo = displaytodo.map((item, i) => {
                    if (i === updateIndex) {
                        return { ...item, todo: editValue }
                    }
                    return item
                })
                setDisplayTodo(updatedTodo);
                props.onData(updatedTodo);
                setEditIndex(null);
            }
        ).catch((error) => {
            console.log(`todo not deleted ${error}`)
        })
    };

    const deleteTodo = (deleteIndex) => {

        const id = displaytodo[deleteIndex]._id
        console.log(`id:${id}`)
        axios.delete(`http://localhost:2000/todos/${id}`).then(
            () => {
                console.log(`delete todo sucessfully`)
                const updatedTodo = displaytodo.filter((item, i) => { return i !== deleteIndex });
                setDisplayTodo(updatedTodo);
                props.onData(updatedTodo);
            }
        ).catch((error) => {
            console.log(`todo not deleted ${error}`)
        })
    };

    useEffect(() => {

        if (Array.isArray(props.display)) {
            setDisplayTodo(props.display);
            console.log(`in display component props.display ${props.display}`)
        }

    }, [props.display]);

    useEffect(() => {
        axios.get("http://localhost:2000/todos")
            .then((res) => {
                console.log(res.data.data);
                setDisplayTodo(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching todos:", error);
            });
    }, []); // Empty dependency array to run once on mount

    return (
        <>
            <div className="bg-yellow-400 h-screen w-screen flex flex-col">

                <div className='flex justify-evenly w-full p-2'>
                    <button className="bg-blue-500 text-white text-lg px-4 h-8 font-bold rounded-md hover:bg-blue-800">All</button>
                    <button className="bg-red-500 text-white text-lg px-4 h-8 font-bold rounded-md hover:bg-red-800">Pending</button>
                    <button className="bg-green-500 text-white text-lg px-4 h-8 font-bold rounded-md hover:bg-green-800">Done</button>
                </div>

                <ul className='flex flex-col items-center self-center overflow-y-auto h-96 w-3/4'>
                    {displaytodo.map((l, index) => {
                        return <li key={index} className='flex justify-between w-3/4 h-10 bg-blue-400 m-1 p-2 rounded'>
                            {editIndex === index ?
                                (<>
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        className='bg-blue-400 w-full p-2 outline-none border-b-2 border-black'
                                    />
                                    <MdSave className='m-1 cursor-pointer' title="save" size={22} onClick={() => saveTodo(index)} />
                                </>) :
                                (
                                    <>
                                        <div>{l.todo}</div>
                                        <div className='flex justify-end items-center'>

                                            <MdInfo className='m-1 cursor-pointer' title="info" size={22} onClick={() => { infoTodo(index) }} />
                                            <MdEdit className='m-1 cursor-pointer' title="edit" size={22} onClick={() => { editTodo(index) }} />
                                            <MdDelete className='m-1 cursor-pointer' title="delete" size={22} onClick={() => { deleteTodo(index) }} />
                                        </div>
                                    </>)}


                        </li>
                    })}
                </ul>

            </div>
            {showInfo && <Info todo={info} onClose={() => setShowInfo(false)} />}
        </>
    )
}

export default Display

