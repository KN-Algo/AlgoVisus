export interface AppNotificationConfig {
    id: string;
    title: string;
  }
   
  export const NOTIFICATIONS: AppNotificationConfig[] = [
    { id: "1", title: "Cykliczne powiadomienie ⏰" },
    { id: "2", title: "Czas na przerwę! ☕" },
    { id: "3", title: "Czas na ćwiczenie! 🔵" },
    { id: "4", title: "Zadbaj o nawodnienie! 💧" },
  ];
   
  // Mapowanie tytułu na id – używane w useNotifications
  export const NOTIFICATION_TITLE_TO_ID: Record<string, string> = Object.fromEntries(
    NOTIFICATIONS.map((n) => [n.title, n.id])
  );
   