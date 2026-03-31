import { useEffect, useState } from "react";
import { useTimeNotification } from "../hooks/useTimeNotification";
import {
  useNotifications,
  type AppNotification,
} from "../hooks/useNotifications";
import { TWEN_MIN_ENABLE } from "../pages/exercises_Zasada20-20-20";

const DEFAULT_TIME = { hour: 0, minut: 0, second: 30 };

const NOTIFICATION_WORK: AppNotification = {
  title: "Zasada 20-20-20",
  options: { body: "Mineło 20 minut możesz wrócić przed monitor" },
};
const NOTIFICATION_BREAK: AppNotification = {
  title: "Zasada 20-20-20",
  options: { body: "Pora odejść od komputera na 20 minut" },
};

export function TwentyMinutesRule() {
  const { permission, requestPermission, sendNotification } =
    useNotifications();

  const workTimer = useTimeNotification(
    sendNotification,
    NOTIFICATION_WORK,
    DEFAULT_TIME,
  );
  const breakTimer = useTimeNotification(
    sendNotification,
    NOTIFICATION_BREAK,
    DEFAULT_TIME,
  );

  const [mode, setMode] = useState<"work" | "break">("work");
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem(TWEN_MIN_ENABLE);
    setEnabled(saved !== null ? JSON.parse(saved) : true);
    if (!enabled) {
      workTimer.reset();
      breakTimer.reset();
    }
  }, []);

  const startCounting = () => {
    if (workTimer.time > 0) {
      breakTimer.reset();
      workTimer.start();
      setMode("work");
    } else {
      workTimer.reset();
      breakTimer.start();
      setMode("break");
    }
  };

  useEffect(() => {
    if (!enabled) return;
    if (permission !== "granted") {
      requestPermission();
    } else {
      startCounting();
    }
  }, [permission, enabled]);

  useEffect(() => {
    if (workTimer.time === 0) {
      workTimer.reset();
      breakTimer.start();
      setMode("work");
    }
    console.log("work timer", workTimer.time);
  }, [workTimer.time, enabled]);

  useEffect(() => {
    if (breakTimer.time === 0) {
      breakTimer.reset();
      workTimer.start();
      setMode("break");
    }
    console.log("break timer", breakTimer.time);
  }, [breakTimer.time, enabled]);

  return (
    <>
      {enabled && mode === "break" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 text-white text-5xl font-bold">
          Przerwa! ⏳
        </div>
      )}
    </>
  );
}
