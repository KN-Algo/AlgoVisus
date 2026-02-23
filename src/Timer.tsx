import { useState, useEffect } from "react";
const SEC_IN_MSEC = 1000;



type Time = {
    hour : number,
    minut : number,
    second : number
};

function TimeToMilSec({ hour, minut, second }: Time): number {
    minut += hour * 60;
    second += minut * 60;
    const m_second : number = second * SEC_IN_MSEC;
    return m_second;
};

function Timer({ hour, minut, second }: Time) {
    const count_time : number = TimeToMilSec({ hour, minut, second })
    
    
    const [time, setTime] = useState<number>(count_time);
    const [alarm, setAlarm] = useState<boolean>(false);
    
    const getTime = () => {
        setTime(prev => prev - SEC_IN_MSEC)

        if (time <= 0) {
            setAlarm(true);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(), SEC_IN_MSEC);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="timer">
        </div>
    );

};
