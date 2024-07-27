import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Info from './Info'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { MdSave } from "react-icons/md";
import { MdDone } from "react-icons/md";

const Display = (props) => {
    const [displaytodo, setDisplayTodo] = useState(props.display)
    //displaytodo is an array of objects
    const [showInfo, setShowInfo] = useState(false)
    const [info, setInfo] = useState({})
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    useEffect(() => {
        setDisplayTodo(props.display);
    }, [props.display]);


    const renderTodo = () => {
        if (props.displaymode.pendingtodo) {
            return (
                <>
                    <div className="bg-yellow-400 h-screen w-screen flex flex-col">

                        <ul className='flex flex-col items-center self-center overflow-y-auto h-96 w-3/4'>
                            {displaytodo.map((l, index) => {

                                return !l.donetodo && (<li key={index} className='flex justify-between w-3/4 h-fit bg-blue-400 m-1 p-2 rounded'>
                                    {editIndex === index ?
                                        (<>
                                            <input
                                                type="text"
                                                maxLength="70"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className='bg-blue-400 w-full p-2 outline-none border-b-2 border-black'
                                            />
                                            <MdSave className='m-1 cursor-pointer' title="save" size={22} onClick={() => saveTodo(index)} />
                                        </>) :
                                        (
                                            <>

                                                <div>{l.todo}, {`${l.donetodo}`}</div>
                                                <div className='flex justify-end items-center'>
                                                    <MdDone className='m-1 cursor-pointer' title="Mark as Done" size={22} onClick={() => { doneTodo(index) }} />
                                                    <MdInfo className='m-1 cursor-pointer' title="info" size={22} onClick={() => { infoTodo(index) }} />
                                                    <MdEdit className='m-1 cursor-pointer' title="edit" size={22} onClick={() => { editTodo(index) }} />

                                                </div>
                                            </>)}


                                </li>)
                            })}
                        </ul>

                    </div>
                    {showInfo && <Info todo={info} onClose={() => setShowInfo(false)} />}
                </>
            )
        }
        else if (props.displaymode.completedtodo) {
            return (
                <>
                    <div className="bg-yellow-400 h-screen w-screen flex flex-col">

                        <ul className='flex flex-col items-center self-center overflow-y-auto h-96 w-3/4'>
                            {displaytodo.map((l, index) => {

                                return l.donetodo && (<li key={index} className='flex justify-between w-3/4 h-fit bg-blue-400 m-1 p-2 rounded'>
                                    {editIndex === index ?
                                        (<>
                                            <input
                                                type="text"
                                                maxLength="70"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className='bg-blue-400 w-full p-2 outline-none border-b-2 border-black'
                                            />
                                            <MdSave className='m-1 cursor-pointer' title="save" size={22} onClick={() => saveTodo(index)} />
                                        </>) :
                                        (
                                            <>

                                                <div>{l.todo}, {`${l.donetodo}`}</div>
                                                <div className='flex justify-end items-center'>

                                                    <MdInfo className='m-1 cursor-pointer' title="info" size={22} onClick={() => { infoTodo(index) }} />
                                                    <MdEdit className='m-1 cursor-pointer' title="edit" size={22} onClick={() => { editTodo(index) }} />
                                                    <MdDelete className='m-1 cursor-pointer' title="delete" size={22} onClick={() => { deleteTodo(index) }} />
                                                </div>
                                            </>)}


                                </li>)
                            })}
                        </ul>

                    </div>
                    {showInfo && <Info todo={info} onClose={() => setShowInfo(false)} />}
                </>
            )
        }
        else if (props.displaymode.alltodo) {
            return (
                <>
                    <div className="bg-yellow-400 h-screen w-screen flex flex-col">


                        <ul className='flex flex-col items-center self-center overflow-y-auto h-96 w-3/4'>
                            {displaytodo.map((l, index) => {

                                return <li key={index} className='flex justify-between w-3/4 h-fit bg-blue-400 m-1 p-2 rounded'>
                                    {editIndex === index ?
                                        (<>
                                            <input
                                                type="text"
                                                maxLength="70"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className='bg-blue-400 w-full p-2 outline-none border-b-2 border-black'
                                            />
                                            <MdSave className='m-1 cursor-pointer' title="save" size={22} onClick={() => saveTodo(index)} />
                                        </>) :
                                        (
                                            <>

                                                <div>{l.todo}, {`${l.donetodo}`}</div>
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
    }

    const doneTodo = (doneIndex) => {

        const id = displaytodo[doneIndex]._id
        axios.put(`http://localhost:2000/todos/${id}`, { donetodo: true }).then(
            () => {
                const updatedTodo = displaytodo.map((item, i) =>
                    i === doneIndex ? { ...item, donetodo: true } : item
                );
                setDisplayTodo(updatedTodo);
                props.onData(updatedTodo)
                console.log(`mark as done`)
            }
        ).catch((error) => {
            console.log(`todo not deleted ${error}`)
        })

    }


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
                props.onData(updatedTodo)

            }
        ).catch((error) => {
            console.log(`todo not deleted ${error}`)
        })
    };



    // useEffect(() => {
    //     props.onData(displaytodo)
    // }, [props.displaymode])


    useEffect(() => {
        axios.get("http://localhost:2000/todos")
            .then((res) => {
                console.log(`donetodo ${res.data.data}`);
                setDisplayTodo(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching todos:", error);
            });
    }, []); // Empty dependency array to run once on mount

    return (
        <>
            {renderTodo()}
        </>
    )
}

export default Display


