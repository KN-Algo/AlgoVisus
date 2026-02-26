import { useState, useEffect } from "react";

const SEC_IN_MSEC = 1000;
const INTERVAL_IN_MSEC = 100;

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

export function Timer({ hour, minut, second }: Time) {
    const count_time : number = TimeToMilSec({ hour, minut, second })

    const [time, setTime] = useState<number>(count_time);
    const [referenceTime, setReferenceTime] = useState<number>(Date.now());
    
    function countDownUntilZero(): void {
        const now = Date.now();
        const interval = now - referenceTime;

        setReferenceTime(now);

        setTime(prev => {
            if (prev <= 0) return 0;
            return Math.max(prev - interval, 0);
        });
    };

    useEffect(() => {
        setTimeout(countDownUntilZero, INTERVAL_IN_MSEC);
    },[time])

    return <>
        {(time / SEC_IN_MSEC).toFixed(0)}
    </>;

};

