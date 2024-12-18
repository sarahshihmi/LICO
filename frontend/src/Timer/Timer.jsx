import React, {useState, useEffect} from 'react'
import './Timer.css'

const Timer = () => {
    const [time, setTime] = useState(0) //time in seconds
    const [isRunning, setIsRunning] = useState(false)

    //start+stop
    const toggleTimer = () => {
        setIsRunning((prev) => !prev)
    }

    //timer logic
    useEffect(() =>{
        let interval
        if (isRunning) {
            interval = setInterval(()=> {
                setTime((prevTime) => prevTime+1)
            }, 10)
        } else {
            clearInterval(interval)
        } 
        return () => clearInterval(interval)
    }, [isRunning])

    //timer formating
    const formatTime = (hundredths) =>{
        const hours = String(Math.floor(hundredths/360000)).padStart(2, '0')
        const minutes = String(Math.floor((hundredths % 360000) / 6000)).padStart(2, '0')
        const seconds = String(Math.floor((hundredths % 6000) / 100)).padStart(2, '0')
        const hundredth = String(hundredths % 100).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}.${hundredth}`
    }

    return (
        <div className ='timer-container'>
            <button className='lockin' onClick={toggleTimer}>LOCK IN</button>
            <div className='intime'>{formatTime(time)}</div>
        </div>
    )
}

export default Timer

