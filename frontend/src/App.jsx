import React, { useState, useEffect } from "react"
import Header from "./components/Header";
import Input from "./components/Input";
import Display from "./components/Display";
import axios from 'axios';
function App() {
  const [todoApp, setTodoApp] = useState([])
  const [displaymode, setDisplaymode] = useState({
    pendingtodo: false,
    completedtodo: false,
    alltodo: true,
  })

  useEffect(() => {
    axios.get("https://todos-backend-z4nv.onrender.com/todos")
      .then((res) => {
        setTodoApp(res.data.data); // Adjust based on your API response structure
        console.log(`donetodo in app compo ${res.data.data}`)

      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);


  return (
    <>
      <Header />
      <Input onData={setTodoApp} input={todoApp} displaymode={displaymode} setDisplaymode={setDisplaymode} />
      <Display display={todoApp} onData={setTodoApp} displaymode={displaymode} />
    </>
  )
}

export default App

