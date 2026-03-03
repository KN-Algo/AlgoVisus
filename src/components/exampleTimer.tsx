import { useEffect } from "react";
import { useTimer } from "@/hooks/useTimer";

export function ExampleTimerComponent() {
  const { time, start, stop, reset } = useTimer({
    hour: 0,
    minut: 0,
    second: 10,
  });

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (time == 0) {
      reset();
      start();
    }
  }, [time]);

  return (
    <div>
      <div>{Math.floor(time / 1000)} s</div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
