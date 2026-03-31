import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../../hooks/useTimer";
import { Button } from "./button";

type ExerciseType = "osemka" | "oddech";
type ViewState = "start" | "selection" | "exercise";
type ExerciseMode = "overlay" | "embedded";

interface EyeExerciseProps {
  forceExercise?: ExerciseType;
  onExit?: () => void;
  mode?: ExerciseMode;
}

export default function EyeExercise({
  forceExercise,
  onExit,
  mode = "overlay",
}: EyeExerciseProps) {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<ViewState>("start");
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | "">(
    "",
  );
  const [isPaused, setIsPaused] = useState(false);
  const [exerciseTime, setExerciseTime] = useState({
    hour: 0,
    minut: 0,
    second: 20,
  });
  const { time, start, reset, stop } = useTimer(
    exerciseTime,
    "eye_exercise_timer",
  );
  const [restartCount, setRestartCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const tRef = useRef<number>(0);
  const breathBallRef = useRef<HTMLDivElement>(null);
  const breathTextRef = useRef<HTMLHeadingElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastPhaseRef = useRef<number>(-1);
  const breathElapsedRef = useRef<number>(0);
  const isEmbedded = mode === "embedded";

  useEffect(() => {
    if (forceExercise) {
      handleStartExercise(forceExercise);
    }
  }, [forceExercise]);

  const handleStartExercise = (exerciseName: ExerciseType) => {
    setSelectedExercise(exerciseName);
    setCurrentView("exercise");
    tRef.current = 0;
    setIsPaused(false);
    startTimeRef.current = null;
    lastPhaseRef.current = -1;
    breathElapsedRef.current = 0;

    if (exerciseName === "osemka") {
      setExerciseTime({ hour: 0, minut: 0, second: 20 });
    } else {
      setExerciseTime({ hour: 0, minut: 1, second: 4 });
    }

    setRestartCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (restartCount > 0) {
      reset();
      setTimeout(() => {
        start();
      }, 50);
    }
  }, [restartCount]);

  useEffect(() => {
    if (
      currentView === "exercise" &&
      selectedExercise === "osemka" &&
      isPaused === false
    ) {
      const animateBall = () => {
        tRef.current += 0.0125;

        if (containerRef.current && ballRef.current) {
          const cWidth = containerRef.current.clientWidth;
          const cHeight = containerRef.current.clientHeight;
          const ballSize = ballRef.current.offsetWidth;
          const A = cWidth / 2 - ballSize / 2 - 10;
          const B = cHeight - ballSize - 10;
          const x = A * Math.sin(tRef.current);
          const y = B * Math.sin(tRef.current) * Math.cos(tRef.current);
          ballRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }

        requestRef.current = requestAnimationFrame(animateBall);
      };

      requestRef.current = requestAnimationFrame(animateBall);
    } else if (
      selectedExercise === "oddech" &&
      isPaused === false &&
      currentView === "exercise"
    ) {
      const animateBreath = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp - breathElapsedRef.current;
        }

        const elapsed = timestamp - startTimeRef.current;
        breathElapsedRef.current = elapsed;
        const cycleTime = elapsed % 16000;
        let currentPhase = 0;
        let scale = 1;
        let maxScale = 1.7;
        let text = "";

        if (containerRef.current && breathBallRef.current) {
          const cHeight = containerRef.current.clientHeight;
          const cWidth = containerRef.current.clientWidth;
          const minDimension = Math.min(cHeight, cWidth);
          const baseSize = breathBallRef.current.offsetWidth;

          maxScale = (minDimension - 112) / baseSize;
          maxScale = Math.max(1.05, Math.min(maxScale, 1.75));
        }

        if (cycleTime < 4000) {
          currentPhase = 0;
          text = "WDECH";
          scale = 1 + (cycleTime / 4000) * (maxScale - 1);
        } else if (cycleTime < 8000) {
          currentPhase = 1;
          text = "ZATRZYMAJ";
          scale = maxScale;
        } else if (cycleTime < 12000) {
          currentPhase = 2;
          text = "WYDECH";
          scale = maxScale - ((cycleTime - 8000) / 4000) * (maxScale - 1);
        } else {
          currentPhase = 3;
          text = "ZATRZYMAJ";
          scale = 1;
        }

        if (currentPhase !== lastPhaseRef.current) {
          if (lastPhaseRef.current !== -1 && "vibrate" in navigator) {
            navigator.vibrate(200);
          }

          lastPhaseRef.current = currentPhase;

          if (breathTextRef.current) {
            breathTextRef.current.innerText = text;
          }
        }

        if (breathBallRef.current) {
          breathBallRef.current.style.transform = `translateZ(0) scale(${scale})`;
        }

        requestRef.current = requestAnimationFrame(animateBreath);
      };

      startTimeRef.current = null;
      lastPhaseRef.current = -1;
      requestRef.current = requestAnimationFrame(animateBreath);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [currentView, selectedExercise, isPaused]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return (
    <div className="p-5 text-center">
      {currentView === "start" && (
        <div>
          <Button onClick={() => setCurrentView("selection")}>
            Zrób ćwiczenie!
          </Button>
        </div>
      )}

      {currentView === "selection" && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Wybierz ćwiczenie:</h2>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="w-72"
              title="Śledź wzrokiem animowaną kuleczkę, która robi ósemki na ekranie."
              onClick={() => navigate("/ósemka")}
            >
              Klasyczna Ósemka
            </Button>

            <Button
              variant="outline"
              className="w-72"
              title="Skup się na oddychaniu: wdech, zatrzymanie, wydech, zatrzymanie. Powtarzaj cykl przez minutę."
              onClick={() => navigate("/oddech")}
            >
              Oddech
            </Button>
          </div>
          <br />
          <Button
            variant="link"
            className="text-gray-500"
            onClick={() => setCurrentView("start")}
          >
            Wróć
          </Button>
        </div>
      )}

      {currentView === "exercise" && (
        <div
          className={
            isEmbedded
              ? "relative flex min-h-[560px] flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-[#1e2024] text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] md:min-h-[680px]"
              : "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1e2024] text-white"
          }
        >
          <div
            className={
              isEmbedded
                ? "absolute right-5 top-5 z-10 hidden text-3xl font-mono font-bold tracking-[0.2em] text-gray-300 md:block"
                : "absolute right-12 top-2 text-4xl font-mono font-bold tracking-widest text-gray-300"
            }
          >
            {Math.floor(time / 1000)}s
          </div>

          <div
            className={
              isEmbedded ? "px-4 pt-8 text-center md:px-6 md:pt-10" : ""
            }
          >
            <h2 className="mb-1 text-3xl font-bold">
              Trwa ćwiczenie:{" "}
              {selectedExercise === "osemka" ? "Ósemka" : "Oddech"}
            </h2>

            {isEmbedded && selectedExercise === "osemka" && (
              <p className="mx-auto max-w-2xl text-sm text-slate-300 md:text-base">
                Skup wzrok na punkcie i podążaj za nim płynnie, bez poruszania
                głową.
              </p>
            )}

            {isEmbedded && selectedExercise === "oddech" && (
              <p className="mx-auto max-w-2xl text-sm text-slate-300 md:text-base">
                Podążaj za rytmem: wdech, zatrzymanie, wydech, zatrzymanie.
              </p>
            )}

            {isEmbedded && (
              <div className="mt-4 flex justify-center md:hidden">
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm font-mono font-bold tracking-[0.18em] text-gray-300">
                  {Math.floor(time / 1000)}s
                </div>
              </div>
            )}
          </div>

          <div
            ref={containerRef}
            className={
              isEmbedded
                ? "relative mx-4 my-4 flex min-h-[420px] flex-1 items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.03] md:mx-6"
                : "relative m-3 flex h-9/10 w-full items-center justify-center border-2 border-dashed border-gray-500"
            }
          >
            {selectedExercise === "osemka" &&
              (time === 0 ? (
                <div
                  key="end-screen"
                  className="flex flex-col items-center gap-5"
                >
                  <h2 className="animate-pulse text-4xl font-bold text-green-500">
                    Koniec ćwiczenia!
                  </h2>
                  <Button onClick={() => handleStartExercise("osemka")}>
                    Powtórz ćwiczenie
                  </Button>
                </div>
              ) : (
                <div
                  key="ball"
                  ref={ballRef}
                  className="rounded-full bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.6)]"
                  style={{
                    width: "clamp(8px, 5vw, 64px)",
                    height: "clamp(8px, 5vw, 64px)",
                  }}
                ></div>
              ))}

            {selectedExercise === "oddech" &&
              (time === 0 ? (
                <div className="flex flex-col items-center gap-5">
                  <h2 className="animate-pulse text-4xl font-bold text-green-500">
                    Oddychanie
                  </h2>
                  <Button onClick={() => handleStartExercise("oddech")}>
                    Powtórz oddychanie
                  </Button>
                </div>
              ) : (
                <div className="relative flex h-full w-full flex-col items-center justify-center">
                  <h3
                    ref={breathTextRef}
                    className="pointer-events-none absolute inset-x-0 top-4 z-10 px-4 text-center text-3xl font-black text-blue-200 md:top-6 md:text-4xl"
                  >
                    WDECH
                  </h3>
                  <div className="flex h-full w-full items-center justify-center pt-20 md:pt-24">
                    <div
                      ref={breathBallRef}
                      className="relative"
                      style={{
                        willChange: "transform",
                        width: "clamp(28px, 16vmin, 128px)",
                        height: "clamp(28px, 16vmin, 128px)",
                        transformOrigin: "center center",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <div
                        className="h-full w-full rounded-full bg-blue-500/70"
                        style={{
                          filter: "drop-shadow(0 0 50px rgba(59,130,246,0.6))",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div
            className={
              isEmbedded
                ? "flex flex-wrap justify-center gap-4 px-4 pb-6 md:px-6 md:pb-8"
                : "flex gap-5"
            }
          >
            <Button
              variant={isPaused ? "default" : "secondary"}
              onClick={() => {
                if (isPaused) {
                  setIsPaused(false);
                  start();
                } else {
                  if (
                    selectedExercise === "oddech" &&
                    startTimeRef.current !== null
                  ) {
                    breathElapsedRef.current =
                      performance.now() - startTimeRef.current;
                    startTimeRef.current = null;
                  }

                  stop();
                  setIsPaused(true);
                }
              }}
            >
              {isPaused ? "Wznów" : "Pauza"}
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                stop();

                if (onExit) {
                  onExit();
                  return;
                }

                navigate("/");
              }}
            >
              {isEmbedded ? "Zakończ ćwiczenie" : "Zakończ i wyjdź"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
