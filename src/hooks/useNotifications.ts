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

  // Wysyłanie powiadomienia – **bez service workera**
  const sendNotification = (notification: AppNotification) => {
    if (Notification.permission !== "granted") {
      alert("Brak zgody na powiadomienia!");
      return;
    }

    try {
      new Notification(notification.title, notification.options);
    } catch (error) {
      console.error("Błąd podczas wyświetlania powiadomienia:", error);
    }
  };

  return { permission, requestPermission, sendNotification };
};
