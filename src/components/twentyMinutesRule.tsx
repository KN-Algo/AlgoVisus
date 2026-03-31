import { useEffect, useState } from "react";
import { useTimeNotification } from "../hooks/useTimeNotification";
import {
  useNotifications,
  type AppNotification,
} from "../hooks/useNotifications";
import { TWEN_MIN_ENABLE } from "../pages/exercises_Zasada20-20-20";

const DEFAULT_TIME = { hour: 0, minut: 0, second: 10 };

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
    NOTIFICATION_BREAK,
    DEFAULT_TIME,
  );
  const breakTimer = useTimeNotification(
    sendNotification,
    NOTIFICATION_WORK,
    DEFAULT_TIME,
  );

  const [mode, setMode] = useState<"work" | "break">("work");
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem(TWEN_MIN_ENABLE);
    setEnabled(saved !== null ? JSON.parse(saved) : true);
  }, []);

  const startCounting = () => {
    if (mode === "work") {
      workTimer.reset();
      workTimer.start();
    } else {
      breakTimer.reset();
      breakTimer.start();
    }
  };

  useEffect(() => {
    if (permission !== "granted") {
      requestPermission();
      return;
    }
    if (!enabled) {
      workTimer.stop();
      breakTimer.stop();
      return;
    } else {
      startCounting();
    }
  }, [permission, enabled]);

  useEffect(() => {
    if (workTimer.time === 0) {
      workTimer.reset();
      breakTimer.start();
      setMode("break");
    }
    console.log("work timer", workTimer.time);
  }, [workTimer.time]);

  useEffect(() => {
    if (breakTimer.time === 0) {
      breakTimer.reset();
      workTimer.start();
      setMode("work");
    }
    console.log("break timer", breakTimer.time);
  }, [breakTimer.time]);

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
