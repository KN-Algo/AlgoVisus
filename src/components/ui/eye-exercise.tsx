import { useState, useEffect, useRef } from 'react';
import { useTimer } from '../../hooks/useTimer';
import { Button } from "./button";
import { useNavigate } from 'react-router-dom';

type ExerciseType = 'osemka' | 'oddech';
type ViewState = 'start' | 'selection' | 'exercise';

export default function EyeExercise({ forceExercise }: { forceExercise?: ExerciseType }) {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<ViewState>('start');
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | ''>('');
  const [isPaused, setIsPaused] = useState(false);
  const [exerciseTime, setExerciseTime] = useState({ hour: 0, minut: 0, second: 20 });
  const { time, start, reset, stop } = useTimer(exerciseTime, 'eye_exercise_timer');
  const [restartCount, setRestartCount] = useState(0);

  useEffect(() => {
    if (forceExercise) {
      handleStartExercise(forceExercise);
      reset();
      setTimeout(() => {
        start();
      }, 50);
    }
  }, [forceExercise]);

  const handleStartExercise = (exerciseName: ExerciseType) => {
    setSelectedExercise(exerciseName);
    setCurrentView('exercise');
    tRef.current = 0;
    setIsPaused(false);
    startTimeRef.current = null;
    lastPhaseRef.current = -1;
    if (exerciseName === 'osemka') {
      setExerciseTime({ hour: 0, minut: 0, second: 20 });
    } else if (exerciseName === 'oddech') {
      setExerciseTime({ hour: 0, minut: 1, second: 4 });
    }
    setRestartCount(prev => prev + 1);
  };
  useEffect(() => {
    if (restartCount > 0) {
      reset();
      setTimeout(() => {
        start();
      }, 50);
    }
  }, [restartCount]);

  const ballRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const tRef = useRef<number>(0); 
  const breathBallRef = useRef<HTMLDivElement>(null);
  const breathTextRef = useRef<HTMLHeadingElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastPhaseRef = useRef<number>(-1);
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

      requestRef.current = requestAnimationFrame(animateBall);
    }
    else if (selectedExercise === 'oddech' && isPaused === false && currentView === 'exercise') {
        const animateBreath = (timestamp: number) => {
          if (!startTimeRef.current) startTimeRef.current = timestamp;
          const elapsed = timestamp - startTimeRef.current;
          const cycleTime = elapsed % 16000;
          let currentPhase = 0;
          let scale = 1;
          let text = "";
          if (cycleTime < 4000) {
            currentPhase = 0;
            text = "WDECH...";
            scale = 1 + (cycleTime / 4000);
          } 
          else if (cycleTime < 8000) {
            currentPhase = 1;
            text = "ZATRZYMAJ...";
            scale = 2; 
          } 
          else if (cycleTime < 12000) {
            currentPhase = 2;
            text = "WYDECH...";
            scale = 2 - ((cycleTime - 8000) / 4000);
          } 
          else {
            currentPhase = 3;
            text = "ZATRZYMAJ...";
            scale = 1; 
          }
          if (currentPhase !== lastPhaseRef.current) {
            if (lastPhaseRef.current !== -1 && "vibrate" in navigator) {
              navigator.vibrate(200);
            }
            lastPhaseRef.current = currentPhase;
            if (breathTextRef.current) breathTextRef.current.innerText = text;
          }

          if (breathBallRef.current) {
            breathBallRef.current.style.transform = `scale(${scale})`;
          }

          requestRef.current = requestAnimationFrame(animateBreath);
        };
        
        startTimeRef.current = null;
        lastPhaseRef.current = -1;
        requestRef.current = requestAnimationFrame(animateBreath);
      }
      return () => cancelAnimationFrame(requestRef.current!);
    }, [currentView, selectedExercise, isPaused,]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

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

      {/* WIDOK 2: Wybór ćwiczenia z instrukcjami  */}
      {currentView === 'selection' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Wybierz ćwiczenie:</h2>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              className="w-72"
              title="Śledź wzrokiem animowaną kuleczkę, która robi ósemki na ekranie."
              onClick={() => { handleStartExercise('osemka'); start();  navigate('/ósemka'); }}>
              Klasyczna Ósemka
            </Button>

            <Button
              variant="outline" 
              className="w-72" 
              title="Skup się na oddychaniu: wdech, zatrzymanie, wydech, zatrzymanie. Powtarzaj cykl przez minutę."
              onClick={() => { handleStartExercise('oddech'); start(); navigate('/oddech'); }}
            >
              Oddech
            </Button>
          </div>
          <br />
          <Button variant="link" className="text-gray-500" onClick={() => setCurrentView('start')}>
              Wróć
          </Button>
        </div>
      )}

      {/* WIDOK 3: Trwające ćwiczenie z opcją pauzy i zakończenia */}
      {currentView === 'exercise' && (
        <div className="fixed inset-0 bg-[#1e2024] text-white z-[9999] flex flex-col justify-center items-center">
          <div className="absolute top-2 right-12 text-4xl font-mono font-bold tracking-widest text-gray-300">
            {Math.floor(time / 1000)}s
          </div>
          <h2 className="text-3xl font-bold mb-1">
            Trwa ćwiczenie: {selectedExercise === 'osemka' ? 'Ósemka' : 'Oddech'}
          </h2>
          <div className="w-full h-9/10 border-2 border-dashed border-gray-500 m-3 flex justify-center items-center">
            
            {selectedExercise === 'osemka' && (
              time === 0 ? (
                <div key="end-screen" className="flex flex-col items-center gap-5"> 
                  <h2 className="text-4xl font-bold text-green-500 animate-pulse">
                    Koniec ćwiczenia!
                  </h2>
                  <Button onClick={() => { handleStartExercise('osemka'); reset(); setTimeout(() => start(), 50); }}>
                    Powtórz ćwiczenie
                  </Button>
                </div>
              ) : (
                <div
                  key="ball"
                  ref={ballRef}
                  className="w-16 h-16 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.6)]"
                ></div>
              )
            )}

            {selectedExercise === 'oddech' && (
               time === 0 ? (
                <div className="flex flex-col items-center gap-5"> 
                  <h2 className="text-4xl font-bold text-green-500 animate-pulse">Oddychanie</h2>
                  <Button onClick={() => { handleStartExercise('oddech'); reset(); setTimeout(() => start(), 50); }}>
                    Powtórz oddychanie
                  </Button>
                </div>
               ) : (
                 <div className="flex flex-col items-center justify-center relative w-full h-full">
                    <h3 
                      ref={breathTextRef} 
                      className="text-4xl font-black tracking-[0.2em] text-blue-200 absolute top-[15%] z-10"
                    >
                       WDECH...
                    </h3>
                    <div
                      ref={breathBallRef}
                      className="w-40 h-40 rounded-full bg-blue-500/70 shadow-[0_0_50px_rgba(59,130,246,0.6)]"
                      style={{ willChange: 'transform' }}
                    ></div>
                 </div>
               )
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
              onClick={() => { 
                stop(); 
                navigate('/');
              }}>
              Zakończ i wyjdź
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}