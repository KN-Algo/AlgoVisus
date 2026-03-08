import { useState, useEffect } from "react";
import { useTimer } from "@/hooks/useTimer";

export function TwentyMinutesRule() {
  const [breakTime, setBreakTime] = useState(false);
  const [message, setMessage] = useState("");
  const { time, start, reset } = useTimer(
    {
      hour: 0,
      minut: 0,
      second: 10,
    },
    "20minRule",
  );
  const showBreakMessage = () =>
    setMessage("Czas na 20 min przerwy od ekranu!!!");
  const showWorkMessage = () => setMessage("Możesz już wrócić przed ekran :)");
  const closeMessage = () => setMessage("");
  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (time === 0 && breakTime === false) {
      showBreakMessage();
      setBreakTime(true);
      console.log("pokaż przerwa");
      reset();
    } else if (time === 0) {
      showWorkMessage();
      setBreakTime(false);
      console.log("pokaż koniec przerwa");
      reset();
    }
    console.log("timer");
  }, [time]);

  return (
    <div>
      {message && (
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <p>{message}</p>
          <p>{"Kliknij przycisk aby zamknąć wiadomość."}</p>
          <button
            onClick={() => {
              closeMessage();
              start();
            }}
          >
            Zamknij
          </button>
        </div>
      )}
    </div>
  );
}
