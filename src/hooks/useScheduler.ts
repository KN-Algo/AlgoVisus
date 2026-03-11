import { useRef } from "react";
import { type AppNotification } from "./useNotifications";

export const useScheduler = (
  sendNotificationFunction: (notif: AppNotification) => void,
) => {
  // Zapamietuje ID interwału, żeby móc go później zatrzymać
  const intervalRef = useRef<number | null>(null);

  const startSchedule = (notification: AppNotification, minutes: number) => {
    if (Notification.permission !== "granted") {
      alert("Brak zgody na powiadomienia.");
      return;
    }

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    const intervalMs = minutes * 60 * 1000;

    // Przypisujemy działający interwał do naszego refa. Dzięki temu funkcja stopSchedule będzie miała do niego dostęp i będzie wiedziała, który konkretnie proces zatrzymać.
    intervalRef.current = window.setInterval(() => {
      sendNotificationFunction(notification);
    }, intervalMs);

    console.log(`Harmonogram odpalony: powiadomienie co ${minutes} min.`);
  };

  const stopSchedule = () => {
    // Jeśli jakikolwiek harmonogram aktualnie działa, zatrzymujemy go i czyscimy refa.
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log("Harmonogram zatrzymany.");
    }
  };

  return { startSchedule, stopSchedule };
};
