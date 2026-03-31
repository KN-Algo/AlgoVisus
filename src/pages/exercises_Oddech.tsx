import { useEffect, useRef, useState } from "react";
import { Wind } from "lucide-react";
import EyeExercise from "../components/ui/eye-exercise.tsx";
import { GradientButton } from "@/components/ui/gradient-button";
import { FooterSection } from "./_components/FooterSection.tsx";

const EXERCISE_TRANSITION_MS = 420;

function OddechPage() {
  const [shouldRenderExercise, setShouldRenderExercise] = useState(false);
  const [isExerciseVisible, setIsExerciseVisible] = useState(false);
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
      const extraGap = 18;
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
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-indigo-50 to-cyan-50" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
        </div>

        <div className="relative flex min-h-[calc(100vh-4rem)] items-start justify-center px-4 pb-16 pt-10 lg:pb-20 lg:pt-14">
          <div className="w-full max-w-5xl">
            <div
              className="mb-10 flex justify-center animate-fade-in-up"
              style={{
                animationDelay: "100ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/70 bg-white/80 shadow-[0_14px_30px_rgba(79,70,229,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_18px_36px_rgba(79,70,229,0.18)] md:h-28 md:w-28">
                <Wind className="h-11 w-11 text-indigo-600 md:h-14 md:w-14" />
              </div>
            </div>

            <h1
              className="mb-6 text-center text-4xl font-bold leading-tight text-slate-900 animate-fade-in-up md:text-5xl lg:text-6xl"
              style={{
                animationDelay: "200ms",
                animationFillMode: "backwards",
              }}
            >
              Ćwiczenie
              <span className="block bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Oddech
              </span>
            </h1>

            <p
              className="mx-auto mb-4 max-w-3xl text-center text-lg leading-relaxed text-slate-600 animate-fade-in-up md:text-xl"
              style={{
                animationDelay: "300ms",
                animationFillMode: "backwards",
              }}
            >
              To spokojne ćwiczenie oddechowe prowadzi Cię przez rytm: wdech,
              zatrzymanie, wydech i ponowne zatrzymanie.
            </p>
            <p
              className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-slate-600 animate-fade-in-up md:text-xl"
              style={{
                animationDelay: "340ms",
                animationFillMode: "backwards",
              }}
            >
              Pomaga wyciszyć napięcie, uspokoić tempo pracy i dać oczom chwilę
              oddechu od ciągłego skupienia na ekranie.
            </p>

            <div
              className="mx-auto mb-12 max-w-sm animate-fade-in-up"
              style={{
                animationDelay: "380ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="rounded-2xl border border-white/75 bg-white/80 p-5 text-center shadow-[0_14px_30px_rgba(79,70,229,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_18px_36px_rgba(79,70,229,0.12)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700/70">
                  Czas trwania
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  1 minuta 4 sekundy
                </p>
              </div>
            </div>

            <div
              className="flex justify-center animate-fade-in-up"
              style={{
                animationDelay: "420ms",
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
        <section className="relative w-full bg-gradient-to-b from-sky-50 via-white to-indigo-50/60 py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700/70">
                Tryb ćwiczenia
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                Oddychaj spokojnie bez opuszczania tej strony
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
                forceExercise="oddech"
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

export default OddechPage;
