import { useState } from "react";
import { NOTIFICATION_TITLE_TO_ID } from "../lib/notificationConfig";

// Interfejs dla powiadomienia
export interface AppNotification {
  title: string;
  options?: NotificationOptions;
}

const COOKIE_KEY = "user_notifications_preferences";

// COOKIES
function getCookie(key: string): string | undefined {
  return document.cookie.split("; ")
    .find(row => row.startsWith(key + "="))
    ?.split("=")[1];
}

export const useNotifications = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>(() => Notification.permission); // zmiana z "default" na () => Notification.permission

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

    // Sprawdenie czy ten typ powiadomienia jest włączony w COOKIES
    const id = NOTIFICATION_TITLE_TO_ID[notification.title];
    if (id) {
      const saved = getCookie(COOKIE_KEY);
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
