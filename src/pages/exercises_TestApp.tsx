import { useEffect, useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { useTimeNotification } from "../hooks/useTimeNotification";
import { type AppNotification } from "../hooks/useNotifications";

export default function TestApp() {
  const { permission, requestPermission, sendNotification } =
    useNotifications();

  const testNotification: AppNotification = {
    title: "Czas na przerwę! ☕",
    options: {
      body: "To powiadomienie wysyła się automatycznie z naszego harmonogramu.",
    },
  };

  // 🔔 Jednorazowy timer (10 sekund)
  const timer = useTimeNotification(sendNotification, testNotification, {
    hour: 0,
    minut: 0,
    second: 10,
  });

  // 🔄 stan cyklu
  const [isCycle, setIsCycle] = useState(false);

  // 🔔 efekt cykliczny
  useEffect(() => {
    if (timer.time === 0) {
      sendNotification(testNotification);

      if (isCycle) {
        timer.reset();
        timer.start();
      }
    }
  }, [timer.time, isCycle]);

  return (
    <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Tester Powiadomień ⏳</h1>

      {permission !== "granted" ? (
        <button
          onClick={requestPermission}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Zezwól na powiadomienia
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          {/* 🔔 natychmiast */}
          <button
            onClick={() => sendNotification(testNotification)}
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Wyślij raz (Teraz)
          </button>

          {/* 🔔 timer */}
          <button
            onClick={timer.start}
            className="bg-yellow-500 text-white px-6 py-2 rounded"
          >
            Uruchom timer (10s)
          </button>

          <button
            onClick={timer.stop}
            className="bg-red-500 text-white px-6 py-2 rounded"
          >
            Zatrzymaj timer
          </button>

          <button
            onClick={timer.reset}
            className="bg-gray-500 text-white px-6 py-2 rounded"
          >
            Reset timer
          </button>

          {/* 🔄 cykliczny */}
          <button
            onClick={() => setIsCycle((prev) => !prev)}
            className={`px-6 py-2 rounded ${
              isCycle ? "bg-purple-500 text-white" : "bg-purple-200 text-black"
            }`}
          >
            {isCycle ? "Cykl ON" : "Cykl OFF"}
          </button>

          <p>Pozostało: {Math.ceil(timer.time / 1000)}s</p>
        </div>
      )}
    </div>
  );
}
