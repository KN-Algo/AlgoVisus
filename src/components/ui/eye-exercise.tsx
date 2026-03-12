import { useState, useEffect, useRef } from 'react';
import { useTimer} from '../../hooks/useTimer';
import { Button } from "./button";

export default function EyeExercise() {
  // Stan przechowujący aktualny widok (1 = start, 2 = wybór, 3 = ćwiczenie)
  type ViewState = 'start' | 'selection' | 'exercise';
  const [currentView, setCurrentView] = useState<ViewState>('start');
  // Stan zapamiętujący, które ćwiczenie wybraliśmy
  type ExerciseType = 'osemka' | 'drzewo';
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | ''>('');


  // Funkcja obsługująca rozpoczęcie ćwiczenia
  const handleStartExercise = (exerciseName: ExerciseType) => {
    setSelectedExercise(exerciseName);
    setCurrentView('exercise');
    tRef.current = 0;
    setIsPaused(false);
  };
  // Timer
  const { time, start, reset, stop } = useTimer({ hour: 0, minut: 0, second: 20 }, 'eyeExerciseTimer');
  const [isPaused, setIsPaused] = useState(false);
  // Kulka 
  const ballRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const tRef = useRef<number>(0); 
  useEffect(() => {
    if (currentView === 'exercise' && selectedExercise === 'osemka' && isPaused === false) {
      const animateBall = () => {
      tRef.current += 0.01;

      const A = 1050; 
      const B = 850; 

      const x = A * Math.sin(tRef.current);
      const y = B * Math.sin(tRef.current) * Math.cos(tRef.current);

      if (ballRef.current) {
        ballRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      requestRef.current = requestAnimationFrame(animateBall);
    };

    requestRef.current = requestAnimationFrame(animateBall);}
    return () => cancelAnimationFrame(requestRef.current!);
  }, [currentView, selectedExercise, isPaused]);

  return (
    <div className="p-5 text-center">
      
      {/* WIDOK 1: Przycisk startowy */}
      {currentView === 'start' && (
        <div>
          <Button onClick={() => setCurrentView('selection')}>
            Zrób ćwiczenie!
          </Button>
        </div>
      )}

      {/*  WIDOK 2: Wybór ćwiczenia z instrukcjami  */}
      {currentView === 'selection' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Wybierz ćwiczenie:</h2>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              className="w-72"
              title="Śledź wzrokiem animowaną kuleczkę, która robi ósemki na ekranie."
              onClick={() => { handleStartExercise('osemka'); start(); }}>
              Klasyczna Ósemka
            </Button>

            <Button
              variant="outline" 
              className="w-72" 
              title="Spójrz w dal i obrysuj wzrokiem kontury drzewa."
              onClick={() => { handleStartExercise('drzewo'); start(); }}
            >
              Ruchy oczu do dali (Drzewo)
            </Button>
          </div>
          <br />
          <Button variant="link" className="text-gray-500" onClick={() => setCurrentView('start')}>
              Wróć
          </Button>
        </div>
      )}

      {/*  WIDOK 3: Trwające ćwiczenie z opcją pauzy i zakończenia */}
      {currentView === 'exercise' && (
        <div className="fixed inset-0 bg-[#1e2024] text-white z-[9999] flex flex-col justify-center items-center">
          <div className="absolute top-2 right-12 text-4xl font-mono font-bold tracking-widest text-gray-300">
            {Math.floor(time / 1000)}s
          </div>
          <h2 className="text-3xl font-bold mb-1">
            Trwa ćwiczenie: {selectedExercise === 'osemka' ? 'Ósemka' : 'Drzewo'}
          </h2>
          <div className="w-full h-9/10 border-2 border-dashed border-gray-500 m-3 flex justify-center items-center">
            {selectedExercise === 'osemka' && (
              time === 0 ? (
                <div key="end-screen" className="flex flex-col items-center gap-5"> 
                  <h2 className="text-4xl font-bold text-green-500 animate-pulse">
                    Koniec ćwiczenia!
                  </h2>
                  <Button onClick={() => { handleStartExercise('osemka'); reset(); start(); }}>
                    Powtórz ćwiczenie
                  </Button>
                </div>
              ) : (
                <div
                  key="ball"
                  ref={ballRef}
                  className="w-16 h-16 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.6)]"
                ></div>)
            )}
          </div>
          <div className="flex gap-5">
            <Button 
              variant={isPaused ? "default" : "secondary"}
              onClick={() => {
                if (isPaused) {
                  setIsPaused(false);
                  start();
                } else {
                  stop();  
                  setIsPaused(true);
                }}}>
                {isPaused ? 'Wznów' : 'Pauza'}
            </Button>

            <Button 
              variant="destructive"
              onClick={() => { setCurrentView('start'); reset();}}>
              Zakończ i wyjdź
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}