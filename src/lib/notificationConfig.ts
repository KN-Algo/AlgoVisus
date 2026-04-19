export interface AppNotificationConfig {
  id: string;
  title: string;
  body: string;
}

export const NOTIFICATIONS: AppNotificationConfig[] = [
  { id: "1", title: "Cykliczne powiadomienie ⏰", body: "To powiadomienie wysyła się automatycznie z naszego harmonogramu." },
  { id: "2", title: "Czas na przerwę! ☕", body: "To powiadomienie wysyła się automatycznie z naszego harmonogramu." },
  { id: "3", title: "Czas na ćwiczenie! 🔵", body: "To powiadomienie wysyła się automatycznie z naszego harmonogramu." },
  { id: "4", title: "Zadbaj o nawodnienie! 💧", body: "To powiadomienie wysyła się automatycznie z naszego harmonogramu." },
];

// Mapowanie tytułu na id – używane w useNotifications
export const NOTIFICATION_TITLE_TO_ID: Record<string, string> = Object.fromEntries(
  NOTIFICATIONS.map((n) => [n.title, n.id])
);
