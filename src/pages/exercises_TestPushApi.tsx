import { useEffect, useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { useTimeNotification } from "../hooks/useTimeNotification";
import { type AppNotification } from "../hooks/useNotifications";
import { NOTIFICATIONS } from "../lib/notificationConfig";

export default function TestPushApi() {
  const { permission, requestPermission, sendNotification } =
    useNotifications();

  const przerwaNotif: AppNotification = {
    title: "Czas na przerwę! ☕",
    options: {
      body: "To powiadomienie wysyła się automatycznie z naszego harmonogramu.",
    },
  };

  const timer = useTimeNotification(sendNotification, przerwaNotif, {
    hour: 0,
    minut: 0,
    second: 10,
  });

  const [isCycle, setIsCycle] = useState(false);

  useEffect(() => {
    if (timer.time === 0) {
      sendNotification(przerwaNotif);
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

          {/* Wysyłanie powiadomień z NOTIFICATIONS */}
          <h2 className="text-xl font-semibold">Wyślij powiadomienie - sprawdzanie cookie:</h2>
          {NOTIFICATIONS.map((n) => (
            <button
              key={n.id}
              onClick={() => sendNotification({ title: n.title, options: { body: n.body } })}
              className="bg-green-500 text-white px-6 py-2 rounded text-left"
            >
               {n.title}
            </button>
          ))}

          {/* Timer dla "Czas na przerwę" */}
          <h2 className="text-xl font-semibold mt-4">Timer — Czas na przerwę! ☕ (10s):</h2>
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
