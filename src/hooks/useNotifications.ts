import { useState } from "react";

// Interfejs dla powiadomienia
export interface AppNotification {
  title: string;
  options?: NotificationOptions;
}

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>(() => {
    if (typeof Notification === "undefined") {
      return "default";
    }

    return Notification.permission;
  });

  // Prośba o zgodę
  const requestPermission = async () => {
    if (typeof Notification === "undefined") {
      return;
    }

    const status = await Notification.requestPermission();
    setPermission(status);
  };

  // Wysyłanie powiadomienia – **bez service workera**
  const sendNotification = (notification: AppNotification) => {
    if (
      typeof Notification === "undefined" ||
      Notification.permission !== "granted"
    ) {
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
