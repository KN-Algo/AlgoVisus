import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { useTimeNotification } from "../hooks/useTimeNotification";
import { type AppNotification } from "../hooks/useNotifications";
import drzewoVideo from "../assets/videos/Drzewo.mp4";

function Drzewko() {
    const [exerciseMenu, setExerciseMenu] = useState(false);
    const [exerciseStarted, setExerciseStarted] = useState(false);
    const [exercisePaused, setExercisePaused] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

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
      second: 5,
    });
    const isTimerFinished = timer.time <= 0;

    useEffect(() => {
      const video = videoRef.current;
      if (!video) {
        return;
      }

      if (exerciseMenu && exerciseStarted && !exercisePaused && !isTimerFinished) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
          });
        }
        return;
      }

      video.pause();

      if (!exerciseStarted) {
        video.currentTime = 0;
      }
    }, [exerciseMenu, exerciseStarted, exercisePaused, timer.time]);
    

  return (
    <div className="min-h-screen w-full px-8 text-center bg-white flex flex-col items-center pt-6">
      
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
            Przejdź do ćwiczenia
          </button>
        </>
      ) : (
        /* --- WIDOK 2: ĆWICZENIE --- */
        <div className="w-full h-full">
          
            <p className=" mb-5 text-lg font-semibold">Pozostało: {Math.ceil(timer.time / 1000)}s</p>
            
            <div className="mb-15 relative mx-auto w-full aspect-square max-w-md bg-black rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
                <video 
                    ref={videoRef}
                className="w-full h-full object-contain"
                    loop         
                    muted        
                    playsInline  
                  preload="metadata"
                  src={drzewoVideo}
                >
                    Twoja przeglądarka nie wspiera wideo.
                </video>
            </div>

            {!exerciseStarted ? (

            <button
                onClick={() => { timer.start(); setExerciseStarted(true); }}
                className="bg-blue-500 text-white px-6 py-2 rounded"
                >
                Rozpocznij
            </button>
            ) : (

            <>

              {!exercisePaused && !isTimerFinished ? (
                <button
                  onClick={() => { timer.stop(); setExercisePaused(true); }}
                  className="bg-blue-500 text-white px-6 py-2 rounded mr-4"
                  >
                  Pauza
                </button>
              ) : !isTimerFinished ? (
                    <button
                        onClick={() => { timer.start(); setExercisePaused(false); }}
                        className="bg-blue-500 text-white px-6 py-2 rounded mr-4"
                        >
                        Wznów
                    </button>
              ) : null}

                    <button
                        onClick={() => { timer.reset(); setExerciseStarted(false); }}
                        className="bg-blue-500 text-white px-6 py-2 rounded"
                        >
                        Zakończ ćwiczenie
                    </button>
            </>

            )}

            <div className="flex flex-col gap-2 items-center mb-5 mt-3">
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
