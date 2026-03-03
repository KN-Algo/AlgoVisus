import { useState } from "react";

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
  const sendNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Sukces!", {
        body: "Wyslano powiadomienie.",
      });
    } else {
      alert("Brak zgody na powiadomienia!");
    }
  };
  return { permission, requestPermission, sendNotification };
};
