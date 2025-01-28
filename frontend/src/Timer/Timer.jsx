import React, {useState, useEffect} from 'react'
import './Timer.css'

const Timer = () => {
    const [time, setTime] = useState(0) //time in seconds
    const [isRunning, setIsRunning] = useState(false)
    const [lockInTime, setLockInTime] = useState(0); //time for lockin timer
    const [clockOutTime, setClockOutTime] = useState(0) //time for clock out timer
    const [isLockInRunning, setIsLockInRunning] = useState (false) // is lock in running?
    const [isClockOutRunning, setIsClockOutRunning] = useState(false) // is clock out running?
    const [showClockOut, setShowClockOut] = useState(false) //toggle between lock and clock display


    //start+stop
    const toggleTimer = () => {
        setIsRunning((prev) => !prev)
    }

    //timer logic
    useEffect(() =>{
        let interval
        if (isLockInRunning) {
            interval = setInterval(()=> {
                setLockInTime((prevTime) => prevTime+1)
            }, 10)
        } else if (isClockOutRunning) {
            interval = setInterval(()=> {
                setClockOutTime((prevTime) => prevTime+1)
            }, 10)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isLockInRunning, isClockOutRunning])

    //timer formating
    const formatTime = (hundredths) =>{
        const hours = String(Math.floor(hundredths/360000)).padStart(2, '0')
        const minutes = String(Math.floor((hundredths % 360000) / 6000)).padStart(2, '0')
        const seconds = String(Math.floor((hundredths % 6000) / 100)).padStart(2, '0')
        const hundredth = String(hundredths % 100).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}.${hundredth}`
    }


    //lock clock logic
    const handleToggle = () => {
        if (isLockInRunning) {
            setIsLockInRunning(false)
            setIsClockOutRunning(true)
        } else if (isClockOutRunning) { 
            setIsClockOutRunning(false)
            setIsLockInRunning(true)
        } else {
            setIsLockInRunning(true)
        }
    }

    //clock out appears after 5
    useEffect (()=> {
        if (lockInTime >= 30000){
            setShowClockOut(true)
        }
    }, [lockInTime])
    return (
        <div className ='timer-container'>
            {!showClockOut ? (
                <div className="lockin-section">
                    <button className="lockin" onClick={handleToggle}>LOCK IN.</button>
                    <div className="intime">{formatTime(lockInTime)}</div>
                </div>
            ) : (
                <div className="split-container">
                    <div className="lockin-section">
                        <button
                            className={`lockin ${isLockInRunning ? 'active' : ''}`}
                            onClick={handleToggle}
                        >
                            LOCK IN
                        </button>
                        <div className="intime">{formatTime(lockInTime)}</div>
                    </div>
                    <div className="clockout-section">
                        <button
                            className={`clockout ${isClockOutRunning ? 'active' : ''}`}
                            onClick={handleToggle}
                        >
                            CLOCK OUT
                        </button>
                        <div className="outtime">{formatTime(clockOutTime)}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Timer

