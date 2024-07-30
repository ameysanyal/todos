import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
const Input = (props) => {

    const [inputValue, setInputValue] = useState('');
    const [displaymode, setDisplaymode] = useState({
        pendingtodo: false,
        completedtodo: false,
        alltodo: true
    })
    const { enqueueSnackbar } = useSnackbar();
    const removeAlltodos = () => {
        axios.delete('https://todos-backend-z4nv.onrender.com/todos').then((res) => {
            console.log(res.data.message)
            props.onData([]);
            enqueueSnackbar('Removed All todos Successfully', { variant: 'success' });
        }).catch((error) => {
            console.log(error)
            enqueueSnackbar('Error', { variant: 'error' });
        })
    }

    useEffect(() => {

        props.setDisplaymode(displaymode)

    }, [displaymode]);

    const handleclick = () => {
        if (inputValue.trim() === "") {
            alert(`Todo can't be empty`)
        }

        else {
            axios.post("https://todos-backend-z4nv.onrender.com/todos", { todo: inputValue, donetodo: false }).then(
                (res) => {
                    // console.log(res)
                    // console.log(res.data)
                    // console.log(`this is props.input ${props.input}`)

                    console.log(`donetodo ${res.data.donetodo}`)
                    const newTodos = [...props.input, res.data];
                    props.onData(newTodos);

                    setInputValue(''); // Clear the input field
                }
            ).catch((error) => {
                console.log(error.message)

            })
        }

    }


    return (
        <div className="bg-purple-950 flex flex-col items-center p-2 pt-16">
            <h2 className="text-xl text-white font-bold p-1">Add Daily Tasks</h2>
            <div className="flex flex-row items-center">
                <input type="text" maxLength="70" value={inputValue} placeholder="Enter Here" className="m-2 w-96 h-8 rounded-md" onChange={(e) => setInputValue(e.target.value)} />

                <button className="bg-purple-400 text-black text-lg px-4 h-8 font-bold rounded-md hover:bg-purple-500" onClick={handleclick}>Add</button>
            </div>
            <div className='flex justify-evenly w-full p-2'>
                <button className="bg-blue-500 text-white text-lg px-4 h-8 font-bold rounded-md hover:bg-blue-800" onClick={() => {
                    setDisplaymode({
                        pendingtodo: false,
                        completedtodo: false,
                        alltodo: true
                    })
                }}>All</button>
                <button className="bg-red-500 text-white text-lg px-4 h-8 font-bold rounded-md hover:bg-red-800" onClick={() => setDisplaymode({
                    pendingtodo: true,
                    completedtodo: false,
                    alltodo: false
                })}>Pending</button>
                <button className="bg-green-500 text-white text-lg px-4 h-8 font-bold rounded-md hover:bg-green-800" onClick={() => {
                    setDisplaymode({
                        pendingtodo: false,
                        completedtodo: true,
                        alltodo: false
                    })
                }} >Done</button>
                <button className="bg-blue-500 text-white text-lg px-4 h-8 font-bold rounded-md hover:bg-blue-800" onClick={removeAlltodos}>Remove All Todos</button>
            </div>
        </div>
    )
}

export default Input


