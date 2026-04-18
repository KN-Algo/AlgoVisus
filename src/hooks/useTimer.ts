import { useState, useEffect, useRef } from "react";
import { subscribe } from "./globalClock";

const SEC_IN_MSEC = 1000;

export type Time = {
  hour: number;
  minut: number;
  second: number;
};

export type UseTimerOptions = {
  persist?: boolean;
};

function TimeToMilSec({ hour, minut, second }: Time): number {
  minut += hour * 60;
  second += minut * 60;
  const m_second: number = second * SEC_IN_MSEC;
  return m_second;
}

export function useTimer(
  { hour, minut, second }: Time,
  storageKey: string,
  { persist = true }: UseTimerOptions = {},
) {
  const countTime = TimeToMilSec({ hour, minut, second });

  const [time, setTime] = useState(countTime);
  const [isRunning, setIsRunning] = useState(false);

  const referenceTime = useRef<number>(0);

  function start() {
    referenceTime.current = Date.now();
    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setTime(countTime);
    setIsRunning(false);
  }

  useEffect(() => {
    return subscribe((now) => {
      if (!isRunning) return;

      const delta = now - referenceTime.current;
      referenceTime.current = now;

      setTime((prev) => Math.max(prev - delta, 0));
    });
  }, [isRunning]);

  useEffect(() => {
    if (!persist) {
      localStorage.removeItem(storageKey);
      return;
    }

    if (time <= 0) {
      localStorage.removeItem(storageKey);
      return;
    }

    if (time !== countTime) localStorage.setItem(storageKey, time.toString());
  }, [time, countTime, persist, storageKey]);

  useEffect(() => {
    if (!persist) {
      return;
    }

    const savedTime = localStorage.getItem(storageKey);
    if (savedTime) {
      setTime(Number(savedTime));
    }
  }, [persist, storageKey]);

  return { time, start, stop, reset };
}
