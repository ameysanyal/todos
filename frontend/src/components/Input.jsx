import React, { useState } from 'react'
import axios from 'axios'

const Input = (props) => {

    const [inputValue, setInputValue] = useState('');
    const handleclick = () => {

        axios.post("http://localhost:2000/todos", { todo: inputValue }).then(
            (res) => {
                // console.log(res)
                // console.log(res.data)
                // console.log(`this is props.input ${props.input}`)
                const newTodos = [...props.input, res.data];
                props.onData(newTodos);

                setInputValue(''); // Clear the input field
            }
        ).catch((error) => {
            console.log(error.message)
        })

    }

    return (
        <div className="bg-green-400 flex flex-col items-center p-2 pt-16">
            <h1 className="text-2xl font-bold p-1">Add Daily Tasks</h1>
            <div className="flex flex-row items-center">
                <input type="text" value={inputValue} placeholder="Enter Here" className="m-2 w-96 h-8 rounded-md" onChange={(e) => setInputValue(e.target.value)} />

                <button className="bg-blue-500 text-white text-lg px-4 h-8 font-bold rounded-md hover:bg-blue-600" onClick={handleclick}>Add</button>
            </div>

        </div>
    )
}

export default Input

