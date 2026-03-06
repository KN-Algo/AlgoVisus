import { useState } from "react";

// Interfejs dla powiadomienia, który zawiera tytuł i opcje
export interface AppNotification {
  title: string;
  options?: NotificationOptions;
}

export const useNotifications = () => {
  // Pamięc stanu dla statusu zgody
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  // Funkcja do pytania o zgode
  const requestPermission = async () => {
    const status = await Notification.requestPermission();
    setPermission(status);
  };
  // Funkcja wysylania powiadomienia
  const sendNotification = async (notifications: AppNotification) => {
    if (Notification.permission === "granted") {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          await registration.showNotification(
            notifications.title,
            notifications.options,
          );
        } catch (error) {
          console.error("Bład podczas wyświetlania powiadomienia:", error);
        }
      } else {
        new Notification(notifications.title, notifications.options);
      }
    } else {
      alert("Brak zgody na powiadomienia!");
    }
  };
  return { permission, requestPermission, sendNotification };
};
