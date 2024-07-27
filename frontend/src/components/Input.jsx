import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Input = (props) => {

    const [inputValue, setInputValue] = useState('');
    const [displaymode, setDisplaymode] = useState({
        pendingtodo: false,
        completedtodo: false,
        alltodo: true
    })


    useEffect(() => {

        props.setDisplaymode(displaymode)

    }, [displaymode]);

    const handleclick = () => {
        if (inputValue.trim() === "") {
            alert(`Todo can't be empty`)
        }

        else {
            axios.post("http://localhost:2000/todos", { todo: inputValue, donetodo: false }).then(
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
        <div className="bg-zinc-400 flex flex-col items-center p-2 pt-16">
            <h1 className="text-2xl font-bold p-1">Add Daily Tasks</h1>
            <div className="flex flex-row items-center">
                <input type="text" maxLength="70" value={inputValue} placeholder="Enter Here" className="m-2 w-96 h-8 rounded-md" onChange={(e) => setInputValue(e.target.value)} />

                <button className="bg-blue-500 text-white text-lg px-4 h-8 font-bold rounded-md hover:bg-blue-600" onClick={handleclick}>Add</button>
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
            </div>
        </div>
    )
}

export default Input


