import { useEffect, useState } from "react";
import { useTimeNotification } from "../hooks/useTimeNotification";
import {
  useNotifications,
  type AppNotification,
} from "../hooks/useNotifications";
import { useTwentyRule } from "../context/useTwentyRule";

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
  const { enabled } = useTwentyRule();
  console.log("ENABLED:", enabled);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (permission !== "granted") {
      requestPermission();
      return;
    }

    if (mode === "work") {
      workTimer.reset();
      workTimer.start();
    } else {
      breakTimer.reset();
      breakTimer.start();
    }
  }, [permission, mode]);

  useEffect(() => {
    if (!enabled) {
      workTimer.reset();
      breakTimer.reset();
    } else {
      workTimer.start();
    }
  }, [enabled]);

  useEffect(() => {
    if (workTimer.time === 0 && mode === "work") {
      workTimer.reset();
      breakTimer.start();
      setMode("break");
    }
  }, [workTimer.time, mode]);

  useEffect(() => {
    if (breakTimer.time === 0 && mode === "break") {
      breakTimer.reset();
      workTimer.start();
      setMode("work");
    }
  }, [breakTimer.time, mode]);

  return (
    <>
      {mode === "break" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 text-white text-5xl font-bold">
          Przerwa! ⏳
        </div>
      )}
    </>
  );
}
