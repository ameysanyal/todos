import React, { useState, useEffect } from "react"

const Header = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    const formatDate = (d) => {
        let year = d.getFullYear();
        let month = String(d.getMonth() + 1).padStart(2, '0');
        let day = String(d.getDate()).padStart(2, '0');

        return `${day}-${month}-${year}`
    }
    const formatTime = (d) => {
        let hour = String(d.getHours()).padStart(2, '0');
        let minutes = String(d.getMinutes()).padStart(2, '0');
        let seconds = String(d.getSeconds()).padStart(2, '0');

        return `${hour}:${minutes}:${seconds}`
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        // return () => clearInterval(timer); // Cleanup the timer on component unmount
    });


    return (
        <header>
            <div className="fixed flex w-full bg-purple-400 justify-between p-2">
                <div className="flex items-center">
                    <img className="h-12 w-12 p-1" src="../logo.svg" alt="" />
                    <span className="text-2xl font-bold">ToDos</span>
                </div>

                <div className="text-2xl font-bold p-1">{formatDate(currentDateTime)}</div>
                <div className="text-2xl font-bold p-1">{formatTime(currentDateTime)}</div>

            </div>

        </header>)
}

export default Header