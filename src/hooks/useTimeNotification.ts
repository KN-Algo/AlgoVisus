import { useEffect } from "react";
import { useTimer } from "./useTimer";
import { type AppNotification } from "./useNotifications";
import type { Time, UseTimerOptions } from "./useTimer";

export const useTimeNotification = (
  sendNotification: (notif: AppNotification) => void,
  notification: AppNotification,
  timeInput: Time,
  timerOptions?: UseTimerOptions,
) => {
  const storageKey = `notif-${notification.title}`;
  const { time, start, stop, reset } = useTimer(
    timeInput,
    storageKey,
    timerOptions,
  );

  useEffect(() => {
    if (time === 0) {
      sendNotification(notification);
      stop();
    }
  }, [time]);

  return { time, start, stop, reset };
};
