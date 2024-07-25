import React, { useState, useEffect } from "react"
import Header from "./components/Header";
import Input from "./components/Input";
import Display from "./components/Display";
import axios from 'axios';
function App() {
  const [todoApp, setTodoApp] = useState([])

  useEffect(() => {
    axios.get("http://localhost:2000/todos")
      .then((res) => {
        setTodoApp(res.data.data); // Adjust based on your API response structure
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);


  console.log(`in app compome ${todoApp}`)
  return (
    <>
      <Header />
      <Input onData={setTodoApp} input={todoApp} />
      <Display display={todoApp} onData={setTodoApp} />
    </>
  )
}

export default App
