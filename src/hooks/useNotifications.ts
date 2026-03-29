import { useState } from "react";
import Cookies from "js-cookie";

// Interfejs dla powiadomienia
export interface AppNotification {
  title: string;
  options?: NotificationOptions;
}

const COOKIE_KEY = "user_notifications_preferences";

// Mapowanie tytułów powiadomień na id zapisywane w COOKIES
const NOTIFICATION_TO_ID: Record<string, string> = {
  "Cykliczne powiadomienie ⏰": "1",
  "Czas na przerwę! ☕": "2",
  "Czas na ćwiczenie! 🔵": "3",
  "Zadbaj o nawodnienie! 💧": "4",
};

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

    // Sprawdenie czy ten typ powiadomienia jest włączony w COOKIES
    const id = NOTIFICATION_TO_ID[notification.title];
    if (id) {
      const saved = Cookies.get(COOKIE_KEY);
      if (saved) {
        try {
          const prefs = JSON.parse(saved);
          // powiadomienie zostaje wyłączone przez użytkowika - nie wysyla sie 
          if (prefs[id] === false) return; 
        } catch (error) {
          console.error("Błąd podczas odczytywania cookies:", error);
        }
      }
    }

    try {
      new Notification(notification.title, notification.options);
    } catch (error) {
      console.error("Błąd podczas wyświetlania powiadomienia:", error);
    }
  };

  return { permission, requestPermission, sendNotification };
};
