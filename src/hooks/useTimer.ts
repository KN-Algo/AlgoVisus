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

export function useTimer({ hour, minut, second }: Time) {
  const count_time: number = TimeToMilSec({ hour, minut, second });

  const [time, setTime] = useState<number>(count_time);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const referenceTime = useRef<number>(Date.now());

  function start() {
    referenceTime.current = Date.now();
    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    referenceTime.current = Date.now();
    setTime(count_time);
    setIsRunning(false);
  }

  function countDownUntilZero(): void {
    if (!isRunning) return;

    const now: number = Date.now();
    const interval: number = now - referenceTime.current;

    referenceTime.current = now;

    setTime((prev) => {
      if (prev <= 0) {
        localStorage.removeItem("lastTime");
        return 0;
      }
      const newTime: number = Math.max(prev - interval, 0);
      localStorage.setItem("lastTime", newTime.toString());
      return newTime;
    });
  }

  useEffect(() => {
    const savedTime = localStorage.getItem("lastTime");
    if (savedTime) setTime(Number(savedTime));
  }, []);

  useEffect(() => {
    setTimeout(countDownUntilZero, INTERVAL_IN_MSEC);
  }, [time]);

  useEffect(() => {
    setTimeout(countDownUntilZero, INTERVAL_IN_MSEC);
  }, [isRunning]);

  return { time, start, stop, reset };
}
