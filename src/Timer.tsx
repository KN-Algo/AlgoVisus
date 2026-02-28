import { useState, useEffect, useRef } from "react";

const SEC_IN_MSEC = 1000;
const INTERVAL_IN_MSEC = 100;

type Time = {
  hour: number;
  minut: number;
  second: number;
};

function TimeToMilSec({ hour, minut, second }: Time): number {
  minut += hour * 60;
  second += minut * 60;
  const m_second: number = second * SEC_IN_MSEC;
  return m_second;
}

export function Timer({ hour, minut, second }: Time) {
  const count_time: number = TimeToMilSec({ hour, minut, second });

  const [time, setTime] = useState<number>(count_time);
  const referenceTime = useRef<number>(Date.now());

  useEffect(() => {
    const savedTime = localStorage.getItem("lastTime");
    if (savedTime) setTime(Number(savedTime));
  }, []);

  function countDownUntilZero(): void {
    const now: number = Date.now();
    const interval: number = now - referenceTime.current;

    referenceTime.current = now;

    setTime((prev) => {
      if (prev <= 0) return 0;
      const newTime: number = Math.max(prev - interval, 0);
      localStorage.setItem("lastTime", newTime.toString());
      return newTime;
    });
  }

  useEffect(() => {
    setTimeout(countDownUntilZero, INTERVAL_IN_MSEC);
  }, [time]);

  return time;
}
