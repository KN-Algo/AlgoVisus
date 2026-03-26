import { useEffect } from "react";
import { useTimeNotification } from "../hooks/useTimeNotification";
import {
  useNotifications,
  type AppNotification,
} from "../hooks/useNotifications";
import type { Time } from "../hooks/useTimer";

const DEFAULT_TIME: Time = { hour: 0, minut: 0, second: 30 };

export function ExampleNotification() {
  const { permission, requestPermission, sendNotification } =
    useNotifications();

  const testNotification: AppNotification = {
    title: "Cykliczne powiadomienie ⏰",
    options: { body: "To powiadomienie wysyła się cyklicznie co 30 sekund." },
  };

  const timer = useTimeNotification(
    sendNotification,
    testNotification,
    DEFAULT_TIME,
  );

  useEffect(() => {
    if (permission !== "granted") {
      requestPermission();
    } else {
      timer.start();
    }
  }, [permission]);

  useEffect(() => {
    if (timer.time === 0 && permission === "granted") {
      timer.reset();
      timer.start();
    }
  }, [timer.time, permission]);

  return null;
}
