import {  useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { useTimeNotification } from "../hooks/useTimeNotification";
import { type AppNotification } from "../hooks/useNotifications";

function Drzewko() {
    const [exerciseMenu, setExerciseMenu] = useState(false);
    const [exerciseStarted, setExerciseStarted] = useState(false);
    const [exercisePaused, setExercisePaused] = useState(false);

    const { sendNotification } =
        useNotifications();


    const testNotification: AppNotification = {
      title: "Czas na przerwę! ☕",
      options: {
        body: "To powiadomienie wysyła się z ćwizczenia Drzewko, które właśnie wykonujesz.",
      },
    };


    const timer = useTimeNotification(sendNotification, testNotification, {
      hour: 0,
      minut: 0,
      second: 10,
    });
    

  return (
    <div className="min-h-screen w-full px-8 text-center bg-white flex flex-col items-center pt-32">
      
      {!exerciseMenu ? (
        /* --- WIDOK 1: INSTRUKCJA --- */
        <>
          <h1 className="text-5xl font-bold mb-16">Drzewko</h1>
          
          <div className="max-w-4xl">
            <p className="text-lg">
              Ćwiczenie "Drzewko" to 2 minutowe zadanie, które polega na obrysowaniu wzrokiem dowolnego obiektu który znajdziesz za oknem.
            </p>
            <p className="text-lg">
              Taka krótka przerwa pozwala na chwilę oderwać się od ekranu, zrelaksować oczy i umysł.
            </p>
          </div>

          <button 
            onClick={() => setExerciseMenu(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-md mt-12"
          >
            Rozpocznij ćwiczenie
          </button>
        </>
      ) : (
        /* --- WIDOK 2: ĆWICZENIE --- */
        <div className="w-full h-full">
          
            <h2 className="text-3xl font-bold mb-3">Ćwiczenie</h2>
            <p className=" mb-10">Pozostało: {Math.ceil(timer.time / 1000)}s</p>
            
            <div className="p-10 border-2 border-dashed border-gray-200 rounded-xl mb-10">
                Miejsce na Twoją implementację ćwiczenia...
            </div>

            {!exerciseStarted ? (

            <button
                onClick={() => { timer.start(); setExerciseStarted(true); }}
                className="bg-blue-500 text-white px-6 py-2 rounded"
                >
                Uruchom timer (10s)
            </button>
            ) : (

            <>

                {!exercisePaused ? (
                    <button
                        onClick={() => { timer.stop(); setExercisePaused(true); }}
                        className="bg-blue-500 text-white px-6 py-2 rounded mr-4"
                        >
                        Zatrzymaj timer
                    </button>
                ) : (
                    <button
                        onClick={() => { timer.start(); setExercisePaused(false); }}
                        className="bg-blue-500 text-white px-6 py-2 rounded mr-4"
                        >
                        Wznów timer
                    </button>
                )}

                    <button
                        onClick={() => { timer.reset(); setExerciseStarted(false); }}
                        className="bg-blue-500 text-white px-6 py-2 rounded"
                        >
                        Zakończ ćwiczenie
                    </button>
            </>

            )}

            <div className="flex flex-col gap-4 items-center mb-10 mt-6">
                <button 
                onClick={() => {
                    setExerciseMenu(false);
                    timer.reset();
                    setExerciseStarted(false);
                    setExercisePaused(false);
                }}
                className="text-gray-400 underline hover:text-gray-600 transition-colors"
                >
                Wróć do instrukcji
                </button>
            </div>

        </div>
      )}

    </div>
  );
}

export default Drzewko;
