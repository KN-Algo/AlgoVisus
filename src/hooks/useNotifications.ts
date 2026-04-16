import { useState } from "react";

// Interfejs dla powiadomienia
export interface AppNotification {
  title: string;
  options?: NotificationOptions;
}

export const useNotifications = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  // Prośba o zgodę
  const requestPermission = async () => {
    const status = await Notification.requestPermission();
    setPermission(status);
  };

  // Wysyłanie powiadomienia (z obsługą Service Workera)
  const sendNotification = async (notification: AppNotification) => {
    if (Notification.permission !== "granted") {
      alert("Brak zgody na powiadomienia!");
      return;
    }

    try {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;
        console.log("service Worker");

        await registration.showNotification(notification.title, {
          ...notification.options,
        });
      } else {
        // fallback (np. starsze przeglądarki / desktop)
        new Notification(notification.title, notification.options);
      }
    } catch (error) {
      console.error("Błąd podczas wyświetlania powiadomienia:", error);
    }
  };

  return { permission, requestPermission, sendNotification };
};
