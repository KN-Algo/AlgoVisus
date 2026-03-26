import { useEffect } from "react";
import { useTimeNotification } from "../hooks/useTimeNotification";
import {
  useNotifications,
  type AppNotification,
} from "../hooks/useNotifications";
import { TimeToMilSec, type Time } from "../hooks/useTimer";

const DEFAULT_TIME: Time = { hour: 0, minut: 0, second: 10 };

const NOTIFICATION_WORK: AppNotification = {
  title: "Pora wrócić do pracy",
  options: { body: "Mineło 20 minut możesz wrócić przed monitor" },
};
const NOTIFICATION_BREAK: AppNotification = {
  title: "Czas na przerwę!!!",
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

  const startCounting = () => {
    if (workTimer.time > 0 && workTimer.time < TimeToMilSec(DEFAULT_TIME)) {
      breakTimer.reset();
      workTimer.start();
    } else {
      workTimer.reset();
      breakTimer.start();
    }
  };

  useEffect(() => {
    if (permission !== "granted") {
      requestPermission();
    } else {
      startCounting();
    }
  }, [permission]);

  useEffect(() => {
    if (workTimer.time === 0) {
      workTimer.reset();
      breakTimer.start();
    }
  }, [workTimer.time]);

  useEffect(() => {
    if (breakTimer.time === 0) {
      breakTimer.reset();
      workTimer.start();
    }
  }, [breakTimer.time]);

  return null;
}
