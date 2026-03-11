import { useNotifications } from "./hooks/useNotifications";
import { useScheduler } from "./hooks/useScheduler";
import { type AppNotification } from "./hooks/useNotifications";

export default function TestApp() {
  // 1. Pobieramy narzędzia do powiadomień
  const { permission, requestPermission, sendNotification } =
    useNotifications();

  // 2. Pobieramy narzędzia do harmonogramu i przekazujemy mu funkcję wysyłającą!
  const { startSchedule, stopSchedule } = useScheduler(sendNotification);

  const testNotification: AppNotification = {
    title: "Czas na przerwę! ☕",
    options: {
      body: "To powiadomienie wysyła się automatycznie z naszego harmonogramu.",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Tester Cykliczny ⏳</h1>

      {permission !== "granted" ? (
        <button
          onClick={requestPermission}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Zezwól na powiadomienia
        </button>
      ) : (
        <div className="flex gap-4">
          {/* Zwykłe kliknięcie */}
          <button
            onClick={() => sendNotification(testNotification)}
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Wyślij raz (Teraz)
          </button>

          {/* Uruchomienie cyklu - np. co 20 minut */}
          <button
            onClick={() => startSchedule(testNotification, 0.1)}
            className="bg-purple-500 text-white px-6 py-2 rounded"
          >
            Uruchom (Co 0.1 min)
          </button>

          {/* Zatrzymanie cyklu */}
          <button
            onClick={stopSchedule}
            className="bg-red-500 text-white px-6 py-2 rounded"
          >
            Zatrzymaj cykl
          </button>
        </div>
      )}
    </div>
  );
}
