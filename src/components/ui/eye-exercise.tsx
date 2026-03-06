import { useState, useEffect } from 'react';

export default function EyeExercise() {
  // Stan przechowujący aktualny widok (1 = start, 2 = wybór, 3 = ćwiczenie)
  const [currentView, setCurrentView] = useState(1);
  
  // Stan zapamiętujący, które ćwiczenie wybraliśmy
  const [selectedExercise, setSelectedExercise] = useState('');

  // Funkcja obsługująca rozpoczęcie ćwiczenia
  const handleStartExercise = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
    setCurrentView(3);
    setTime(0);
    setIsRunning(true);
  };
  // Zegar
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning && currentView === 3) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, currentView]);

  return (
    <div className="p-5 text-center">
      
      {/* WIDOK 1: Przycisk startowy */}
      {currentView === 1 && (
        <div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => setCurrentView(2)}>
            Zrób ćwiczenie!
          </button>
        </div>
      )}

      {/*  WIDOK 2: Wybór ćwiczenia z instrukcjami  */}
      {currentView === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Wybierz ćwiczenie:</h2>
          <div className="flex justify-center gap-4">
            
            <button 
              className="w-72 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
              title="Śledź wzrokiem animowaną kuleczkę, która robi ósemki na ekranie."
              onClick={() => handleStartExercise('osemka')}
            >
              Klasyczna Ósemka
            </button>

            <button
              className="w-72 px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition" 
              title="Spójrz w dal i obrysuj wzrokiem kontury drzewa."
              onClick={() => handleStartExercise('drzewo')}
            >
              Ruchy oczu do dali (Drzewo)
            </button>
            
          </div>
          <br />
          <button className="px-4 py-2 text-gray-500 underline hover:text-gray-700" onClick={() => setCurrentView(1)}>Wróć</button>
        </div>
      )}

      {/*  WIDOK 3: Trwające ćwiczenie z opcją pauzy i zakończenia */}
      {currentView === 3 && (
        <div className="fixed inset-0 bg-[#1e2024] text-white z-[9999] flex flex-col justify-center items-center">
          <div className="absolute top-2 right-12 text-4xl font-mono font-bold tracking-widest text-gray-300">
            {time}
          </div>
          <h2 className="text-3xl font-bold mb-1">
            Trwa ćwiczenie: {selectedExercise === 'osemka' ? 'Ósemka' : 'Drzewo'}
          </h2>
          <div className="w-full h-9/10 border-2 border-dashed border-gray-500 m-3 flex justify-center items-center">
            <p>Tutaj będzie latać kuleczka albo rysować się drzewo.</p>
          </div>
          <div className="flex gap-5">
            <button className={`px-5 py-2.5 rounded cursor-pointer ${isRunning ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-green-600 hover:bg-green-400'}`} onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? 'Pauza' : 'Wznów' }
            </button>
            <button 
              className="px-5 py-2.5 bg-red-600 hover:bg-red-400 rounded cursor-pointer"
              onClick={() => setCurrentView(1)}
            >
              Zakończ i wyjdź
            </button>
          </div>
        </div>
      )}
    </div>
  );
}