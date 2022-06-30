import { useEffect, useState } from 'react';
import '../styles/timer.css';

const Timer = () => {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);



    useEffect(() => {
        setInterval(() => {

                setSeconds( seconds + 1);
            
        }, 1000)
    })

    return(
        <div className='DIV-timer'>
           {`${minutes}:${seconds}`}
        </div>
    )
}

export default Timer;