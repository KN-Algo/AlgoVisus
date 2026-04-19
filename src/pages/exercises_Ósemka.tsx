import { useEffect, useRef, useState } from "react";
import EyeExercise from "../components/ui/eye-exercise.tsx";
import { GradientButton } from "@/components/ui/gradient-button";
import { FooterSection } from "./_components/FooterSection.tsx";

const EXERCISE_TRANSITION_MS = 420;

export default function OsemkaPage() {
  const [shouldRenderExercise, setShouldRenderExercise] = useState(false);
  const [isExerciseVisible, setIsExerciseVisible] = useState(false);
  const exerciseSectionRef = useRef<HTMLElement | null>(null);
  const exerciseCardRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    if (!shouldRenderExercise) {
      return;
    }

    requestAnimationFrame(() => {
      setIsExerciseVisible(true);
    });
  }, [shouldRenderExercise]);

  useEffect(() => {
    if (!isExerciseVisible || !exerciseCardRef.current) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const element = exerciseCardRef.current;
      if (!element) {
        return;
      }

      const navbarOffset = 50;
      const extraGap = 17;
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;

      window.scrollTo({
        top: Math.max(0, absoluteTop - navbarOffset - extraGap),
        behavior: "smooth",
      });
    }, 280);

    return () => window.clearTimeout(timeoutId);
  }, [isExerciseVisible]);

  const handleOpenExercise = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (shouldRenderExercise) {
      setIsExerciseVisible(true);
      return;
    }

    setShouldRenderExercise(true);
  };

  const handleCloseExercise = () => {
    setIsExerciseVisible(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    closeTimeoutRef.current = window.setTimeout(() => {
      setShouldRenderExercise(false);
      closeTimeoutRef.current = null;
    }, EXERCISE_TRANSITION_MS);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <section className="relative w-full min-h-screen overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
        </div>

        <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-16 lg:py-24">
          <div className="max-w-5xl w-full">
            <div
              className="flex justify-center mb-10 animate-fade-in-up"
              style={{
                animationDelay: "100ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/70 bg-white/80 text-6xl font-light text-cyan-500 shadow-[0_14px_30px_rgba(14,165,233,0.10)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_18px_36px_rgba(14,165,233,0.16)] md:h-28 md:w-28 md:text-7xl">
                ∞
              </div>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-900 mb-6 leading-tight animate-fade-in-up"
              style={{
                animationDelay: "200ms",
                animationFillMode: "backwards",
              }}
            >
              Ćwiczenie
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500">
                Ósemka
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-slate-600 text-center mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up"
              style={{
                animationDelay: "300ms",
                animationFillMode: "backwards",
              }}
            >
              To krótkie ćwiczenie pomaga rozluźnić oczy i poprawić płynność
              śledzenia wzrokiem. Po rozpoczęciu pojawi się animowany punkt,
              który będziesz śledzić wzrokiem po torze w kształcie ósemki.
            </p>

            <div
              className="mx-auto mb-12 max-w-sm animate-fade-in-up"
              style={{
                animationDelay: "350ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="rounded-2xl border border-white/70 bg-white/78 p-5 text-center shadow-[0_14px_30px_rgba(14,165,233,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_18px_36px_rgba(14,165,233,0.12)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700/70">
                  Czas trwania
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  20 sekund
                </p>
              </div>
            </div>

            <div
              className="flex justify-center animate-fade-in-up"
              style={{
                animationDelay: "400ms",
                animationFillMode: "backwards",
              }}
            >
              <GradientButton onClick={handleOpenExercise}>
                Rozpocznij ćwiczenie
              </GradientButton>
            </div>
          </div>
        </div>
      </section>

      {shouldRenderExercise && (
        <section
          ref={exerciseSectionRef}
          className="relative w-full bg-gradient-to-b from-slate-50 via-white to-cyan-50/50 py-10 md:py-14"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700/70">
                Tryb ćwiczenia
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                Ćwicz bez opuszczania tej strony
              </h2>
            </div>

            <div
              ref={exerciseCardRef}
              className={`transform-gpu transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isExerciseVisible
                  ? "translate-y-0 scale-100 opacity-100 duration-500"
                  : "translate-y-6 scale-[0.985] opacity-0 duration-400"
              }`}
            >
              <EyeExercise
                forceExercise="osemka"
                mode="embedded"
                onExit={handleCloseExercise}
              />
            </div>
          </div>
        </section>
      )}

      <FooterSection />
    </div>
  );
}
